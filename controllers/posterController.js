import { cloudinaryInstance } from "../config/cloudinary.js";
import Poster from "../models/Posters.js";



export const addPosters = async (req, res) => {
    try {
        if (!req.files) {
            return res.status(400).json({
                success: false,
                message: 'no file uploaded'
            })
        }



        // Map through the files and upload each to Cloudinary
        const uploadedImages = await Promise.all(
            req.files.map(file =>
                new Promise((resolve, reject) => {
                    const stream = cloudinaryInstance.uploader.upload_stream(
                        { folder: "product-images" },
                        (error, result) => {
                            if (error) {
                                console.error("Cloudinary upload error:", error);
                                return reject(error);
                            }
                            resolve(result.secure_url); // Resolve with the image URL
                        }
                    );
                    stream.end(file.buffer); // Send file buffer to Cloudinary
                })
            )
        );


        const imageUrl = uploadedImages;

        const createPoster = new Poster({
            images:imageUrl
        })

        const newPosterCreated = await createPoster.save();

        if(!newPosterCreated) return res.status(400).json({message:'poster is not created'})

            return res.status(200).json({message:"poster created",newPosterCreated});

    } catch (error) {
        res.status(500).json({ success: false, message: "Upload failed", error });

        console.log(error);
        
    }
}



export const getAllPosters = async(req,res)=>{

    const posters = await Poster.find();

    if(!posters) return res.status(400).json({message:"error finding posters"})

    res.status(200).json(posters)

}