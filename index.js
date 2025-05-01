import express from "express";
import "dotenv/config";
import connectDB from "./config/database.js";
import userRouter from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import productRouter from "./routes/productRoutes.js";
import cors from "cors";
import bagRouter from "./routes/bagRoutes.js";
import addressRouter from "./routes/addressRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js";
import posterRouter from "./routes/posterRoutes.js";
import orderRouter from "./routes/ordersRoutes.js";


const app = express();

app.use(cookieParser());

//app.use(cors({origin:process.env.fe_url,credentials:true}))

app.use(cors({
    origin: "https://www.nekonation.in",
    credentials: true,
  }));
  app.options("*", cors());


app.use(express.json());


app.use('/api/v1/user',userRouter);
app.use('/api/v1/product',productRouter);
app.use('/api/v1/poster',posterRouter)
app.use('/api/v1/bag',bagRouter)
app.use('/api/v1/address',addressRouter);
app.use('/api/v1/payment',paymentRouter);
app.use('/api/v1/order',orderRouter);


connectDB();

app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.listen(process.env.Port,()=>{
    console.log(`App listening on port :${process.env.Port}`);
    
})