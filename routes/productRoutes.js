import express from "express";
import { createProduct, getAllProducts, getLatestProducts, getProductById, getProductBySearch, productByGender, productByInterests, updateProduct } from "../controllers/ProductController.js";
import upload from "../middlewares/uploadMiddleware.js";
import authenticateManager from "../middlewares/managerMiddleware.js";



const productRouter = express.Router();


productRouter.post('/create-product',authenticateManager,upload.array("images", 10),createProduct);
productRouter.get('/get-all-production',getAllProducts);
productRouter.get('/get-productBy-id/:id',getProductById);
productRouter.get('/search',getProductBySearch);
productRouter.get('/latest-products',getLatestProducts);
productRouter.get('/product-by-gender/:gender',productByGender);
productRouter.get('/product-by-interests/:interests',productByInterests);
productRouter.put('/update-product/:id',authenticateManager,upload.array("images", 10),updateProduct);




export default productRouter