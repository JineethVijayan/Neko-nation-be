import express from "express";
import { createProduct, getAllProducts, getProductById, getProductBySearch } from "../controllers/ProductController.js";
import upload from "../middlewares/uploadMiddleware.js";


const productRouter = express.Router();


productRouter.post('/create-product',upload.array("images", 10),createProduct);
productRouter.get('/get-all-production',getAllProducts);
productRouter.get('/get-productBy-id/:id',getProductById);
productRouter.get('/search',getProductBySearch);





export default productRouter