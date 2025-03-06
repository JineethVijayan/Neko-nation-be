import express from 'express';
import { findCurrentUser, logout, signIn, signUP } from '../controllers/userController.js';
import authenticateUser from '../middlewares/userMiddleware.js';




const userRouter = express.Router();





userRouter.post('/signup',signUP);

userRouter.post('/signIn',signIn);

userRouter.get('/get-current-user',authenticateUser,findCurrentUser);

userRouter.get('/logout',logout);


export default userRouter ;