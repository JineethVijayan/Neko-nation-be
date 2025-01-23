import mongoose from "mongoose";

const deliveryAddressSchema = new mongoose.Schema(
    {

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the User model
            required: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        addressLine1: {
            type: String,
            required: true,
        },
        addressLine2: {
            type: String,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        postalCode: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        isDefault: {
            type: Boolean,
            default: false, // Mark one address as default
        },
    },
    { timestamps: true }
);



const DeliveryAddress = mongoose.model('DeliveryAddress', deliveryAddressSchema);

export default DeliveryAddress;