import express from 'express';
import { findCurrentUser, signIn, signUP } from '../controllers/userController.js';




const userRouter = express.Router();





userRouter.post('/signup',signUP);

userRouter.post('/signIn',signIn);

userRouter.get('/get-current-user',findCurrentUser);




export default userRouter ;