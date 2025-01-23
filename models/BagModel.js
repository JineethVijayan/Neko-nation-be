import mongoose from "mongoose";



const BagSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the User model
            required: true,
        },
        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product', // Reference to the Product model
                    required: true,
                },
                size: {
                    type: String,
                    required: true, // Ensure size is specified for each item
                    enum: ['S', 'M', 'L', 'XL', 'XXL'], // Match available sizes in Product model
                },
                color: {
                    type: String,
                    required: true, // Ensure color is specified for each item
                },
                quantity: {
                    type: Number,
                    required: true,
                    default: 1,
                    min: 1,
                },
            },
        ],
        totalItems: {
            type: Number,
            required: true,
            default: 0
        },
        totalPrice: {
            type: Number,
            required: true,
            default: 0,
        },

    },
    { timestamps: true }
);

BagSchema.methods.calculateTotalPrice = async function () {
    // Populate product prices
    await this.populate('items.product', 'price');

    this.totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0); // Calculate total items

    // Calculate total price
    this.totalPrice = this.items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
    );
};



const Bag = mongoose.model('Bag', BagSchema);


export default Bag;