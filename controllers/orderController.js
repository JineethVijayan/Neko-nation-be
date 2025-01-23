// import DeliveryAddress from '../models/AddressModel.js';
// import Bag from '../models/BagModel.js';
// import Order from '../models/OrderModel.js';

// export const createOrder = async (req, res) => {
//   const { userId, addressId, bagId } = req.body;

//   try {
//     // Fetch the user's delivery address
//     const address = await DeliveryAddress.findById(addressId);
//     if (!address) {
//       return res.status(400).json({ message: 'Address not found' });
//     }

//     // Fetch the user's bag (cart) with populated products
//     const bag = await Bag.findById(bagId).populate('products.productId');
//     if (!bag) {
//       return res.status(400).json({ message: 'Bag not found' });
//     }

//     // Create the order
//     const order = new Order({
//       user: userId,
//       address: addressId,
//       bag: bagId, // Link to the bag (cart)
//       paymentStatus: 'pending', // Initially set payment status to 'pending'
//     });

//     const savedOrder = await order.save();
//     res.status(200).json({ message: 'Order created successfully', order: savedOrder });
//   } catch (error) {
//     console.error('Error creating order:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };
