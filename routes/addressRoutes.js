import express from "express"
import { addAddress, deleteAddress, getAdress, updateAddress } from "../controllers/addressController.js";


const addressRouter = express.Router();


addressRouter.post('/add-address',addAddress);
addressRouter.get('/get-addresses/:userId',getAdress);
addressRouter.put('/update-address/:id',updateAddress);
addressRouter.delete('/delete-address/:id',deleteAddress);

export default addressRouter;