import express from "express";
import { getAllOrders, getOrderByUserId, updateOrder } from "../controllers/orderController.js";
import authenticateManager from "../middlewares/managerMiddleware.js";


const orderRouter = express.Router();

orderRouter.get("/get-all-orders",authenticateManager,getAllOrders);
orderRouter.put("/update-order",authenticateManager,updateOrder);
orderRouter.get("/get-orderByUserId/:id",authenticateManager,getOrderByUserId)

export default orderRouter ;