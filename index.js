import express from "express";
import connectDB from "./config/database.js";
import userRouter from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import productRouter from "./routes/productRoutes.js";
import cors from "cors";
import bagRouter from "./routes/bagRoutes.js";
import addressRouter from "./routes/addressRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js";


const app = express();

app.use(cookieParser());

app.use(cors({origin:'https://neko-nation-fe.vercel.app',credentials:true}))

app.use(express.json());


app.use('/api/v1/user',userRouter);
app.use('/api/v1/product',productRouter);
app.use('/api/v1/bag',bagRouter)
app.use('/api/v1/address',addressRouter);
app.use('/api/v1/payment',paymentRouter)

const port = 3003 ;
connectDB();

app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.listen(port,()=>{
    console.log(`App listening on port :${port}`);
    
})