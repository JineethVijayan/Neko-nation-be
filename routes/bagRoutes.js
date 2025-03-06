import express from "express";
import { addBag, deleteBagItem, getBag, getBagById, updateBagItem } from "../controllers/bagController.js";
import authenticateUser from "../middlewares/userMiddleware.js";


const bagRouter = express.Router();


bagRouter.post('/add-bag',authenticateUser, addBag);
bagRouter.get('/get-bag/:id',authenticateUser,getBag);
bagRouter.put('/update-bagitem', authenticateUser,updateBagItem);
bagRouter.post('/delete-item',authenticateUser, deleteBagItem);
bagRouter.get('/get-bag-byId/:id', authenticateUser,getBagById);

export default bagRouter;