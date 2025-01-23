import express from "express";
import { addBag, deleteBagItem, getBag, updateBagItem } from "../controllers/bagController.js";


const bagRouter = express.Router();


bagRouter.post('/add-bag', addBag);
bagRouter.get('/get-bag/:id',getBag);
bagRouter.put('/update-bagitem',updateBagItem);
bagRouter.post('/delete-item',deleteBagItem);

export default bagRouter;