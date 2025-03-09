import mongoose from "mongoose";


const PosterSchema = new mongoose.Schema({
    images: {
        type: [String], // Array of image URLs
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
},

{timestamps:true}

);

const Poster = mongoose.model('Poster', PosterSchema);

export default Poster ;