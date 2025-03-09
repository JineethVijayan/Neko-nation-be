import express from "express";
import authenticateManager from "../middlewares/managerMiddleware.js";
import { addPosters, getAllPosters } from "../controllers/posterController.js";
import upload from "../middlewares/uploadMiddleware.js";



const posterRouter = express.Router();



posterRouter.post('/create-poster',upload.array("images",10),addPosters);
posterRouter.get('/get-posters',getAllPosters)

export default posterRouter