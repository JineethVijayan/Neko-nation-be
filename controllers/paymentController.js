import razorpayInstance from '../config/payment.js';
import crypto from 'crypto';
import Order from '../models/OrderModel.js';
import Bag from '../models/BagModel.js';
import Payment from '../models/PaymentModel.js';
import DeliveryAddress from '../models/AddressModel.js'
// router.post('/create-order', 
export const createRazorpayOrder = async (req, res) => {
    const { id } = req.body;

    // console.log(id);



 

    const bag = await Bag.findOne({ _id: id }).populate('');

    // console.log(bag.totalPrice);

    let totalAmount = bag.totalPrice;

    const options = {
        amount: totalAmount * 100, // Razorpay accepts amounts in paise
        currency: 'INR',
        receipt: `receipt_${Date.now()}`,
    };

    try {
        const razorpayOrder = await razorpayInstance.orders.create(options);
        // console.log(razorpayOrder);
        
        res.status(200).json({
            success: true,
            razorpayOrderId: razorpayOrder.id,
            amount: options.amount,
        });
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).json({ message: 'Failed to create Razorpay order' });
    }
};




export const verifyPaymentAndCreateOrder = async (req, res) => {
    const { razorpayPaymentId, razorpayOrderId,razorpaySignature, userId, addressId, bagId } = req.body;
    // razorpay_order_id, razorpay_payment_id, razorpay_signature 
   
console.log(req.body);

try {
                //order
     // Fetch the user's delivery address
    const address = await DeliveryAddress.findById(addressId);
    if (!address) {
      return res.status(400).json({ message: 'Address not found' });
    }

    // Fetch the user's bag (cart) with populated products
    const bag = await Bag.findById(bagId).populate("items.product");
    if (!bag) {
      return res.status(400).json({ message: 'Bag not found' });
    }

    // Create the order
    const order = new Order({
      user: userId,
      address: addressId,
      bag: bagId, // Link to the bag (cart)
      paymentStatus: 'pending', // Initially set payment status to 'pending'
    });

    const savedOrder = await order.save();
    // res.status(200).json({ message: 'Order created successfully', order: savedOrder });


     ///payment


    const sign = razorpayOrderId + "|" + razorpayPaymentId;

    // secret_key - random bytes
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET || "s")
      .update(sign.toString())
      .digest("hex");

    // console.log(razorpay_signature === expectedSign);

    const isAuthentic = expectedSign === razorpaySignature;
    console.log(isAuthentic);

    if (isAuthentic) {
      const payment = new Payment({
        order:savedOrder._id,
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature,
        paymentStatus:'success'
      });

     const savedPayment = await payment.save();

     
      res.status(200).json({ message: 'Payment Successfully',payment:savedPayment });
    }
  } catch (error) {
    res.status(500).json({ message: error || "Internal Server Error!" });
    console.log(error);
  }


 
};


