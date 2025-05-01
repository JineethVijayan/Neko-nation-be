// order created in payment controller

import Order from "../models/OrderModel.js";


export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("user").populate("address").populate("bag");
        const totalOrders = await Order.countDocuments();
        res.status(200).json({ orders, totalOrders });

    } catch (error) {
        res.status(500).send("Internal error");
    }
}


export const updateOrder = async (req, res) => {
    try {
        const { orderId, orderStatus } = req.body;
        if (!orderId || !orderStatus) return res.status(400).json({ message: "All fields are required" });
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { status: orderStatus },
            { new: true }
        );
        if(!updatedOrder) return res.status(400).json({message:"Failed to update order"});

        const orders = await Order.find().populate("user").populate("address").populate("bag");   /// to recollect the orders in frontend with out refreshing 

        res.status(200).json({message:"order updated successfully",updatedOrder,orders})

    } catch (error) {
        res.status(500).json({ message: "Internal error" })
    }
}

export const getOrderByUserId = async(req,res)=>{
    try {
      
        const orderId = req.params.id; 

        if(!orderId) return res.status(400).json({message:"order id required"});

        const order = await Order.findOne({_id:orderId}).populate("user").populate("address").populate("bag").populate({
            path: "bag",
            populate: {
              path: "items.product",
              model: "Product",
            },
          });

        if(!order) return res.status(400).json({message:"order not found"});
        
       res.status(200).json({message:"order found",order});    

    } catch (error) {
        res.status(500).json({message:"Internal error"})
    }
}