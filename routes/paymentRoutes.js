import express from "express";
import { createRazorpayOrder, verifyPaymentAndCreateOrder } from "../controllers/paymentController.js";

const paymentRouter = express.Router();

paymentRouter.post('/create-order',createRazorpayOrder);
paymentRouter.post('/verify',verifyPaymentAndCreateOrder)




export default paymentRouter;