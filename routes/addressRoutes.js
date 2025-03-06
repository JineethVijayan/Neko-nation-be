import express from "express"
import { addAddress, deleteAddress, getAdress, updateAddress } from "../controllers/addressController.js";
import authenticateUser from "../middlewares/userMiddleware.js";


const addressRouter = express.Router();


addressRouter.post('/add-address',authenticateUser,addAddress);
addressRouter.get('/get-addresses/:userId',authenticateUser,getAdress);
addressRouter.put('/update-address/:id',authenticateUser,updateAddress);
addressRouter.delete('/delete-address/:id',authenticateUser,deleteAddress);

export default addressRouter;