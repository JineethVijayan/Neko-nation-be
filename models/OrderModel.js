import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DeliveryAddress', // Reference to the DeliveryAddress model
      required: true,
    },
    bag: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bag', // Reference to the Bag model
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['pending','completed', 'failed'],
      default: 'pending',
    },
    status: {
      type: String,
      enum: ['pending', 'shipped', 'delivered', 'canceled'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
