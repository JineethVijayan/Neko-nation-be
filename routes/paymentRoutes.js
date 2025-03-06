import express from "express";
import { createRazorpayOrder, verifyPaymentAndCreateOrder } from "../controllers/paymentController.js";
import authenticateUser from "../middlewares/userMiddleware.js";

const paymentRouter = express.Router();

paymentRouter.post('/create-order',authenticateUser,createRazorpayOrder);
paymentRouter.post('/verify',authenticateUser,verifyPaymentAndCreateOrder)




export default paymentRouter;