import mongoose from "mongoose";


const ProductSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['T-Shirt', 'Hoodie', 'Pants', 'Jacket', 'Accessories'], // Add more categories as needed
  },
  subcategory: {
    type: String,
    enum: ['Regularfit-Tshirt', 'Oversized-Tshirt', 'Printed-Shirt', 'Casual-Shirt']
  },
  interests: {
    type: String,
    enum: ['Culture','Movies','Sports','Anime','Music']
  },
  gender: {
    type: String,
    required: true,
    enum: ['Men', 'Women', 'Unisex']
  },
  sizes: {
    type: [String],
    enum: ['S', 'M', 'L', 'XL', 'XXL'], // Available sizes
    required: true,
  },
  colors: {
    type: [String], // List of available colors
    required: true,
  },
  stock: {
    type: Number, // Quantity in stock
    required: true,
  },
  images: {
    type: [String], // Array of image URLs
    required: true,
  },
  tags: {
    type: [String], // Tags for searchability (e.g., 'anime', 'streetwear')
  },
  isFeatured: {
    type: Boolean,
    default: false, // Feature product on homepage
  },

},
  { timestamps: true }
);


const Product = mongoose.model('Product', ProductSchema);

export default Product;