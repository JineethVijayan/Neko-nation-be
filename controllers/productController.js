import { cloudinaryInstance } from "../config/cloudinary.js"
import Product from "../models/ProductModel.js";




export const createProduct = async (req, res) => {

    try {

        console.log(req.files);
        console.log(req.body);
        
        
        
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

            const body = req.body;

            const {name,price,description,category,interests,subcategory,gender,sizes,colors,stock,tags} = body;

     const createProduct = new Product({
        name,
        price,
        description,
        category,
        subcategory,
        interests,
        gender,
        sizes,
        colors,
        stock,
        images:imageUrl,
        tags
     })

     const newProductCreated = await createProduct.save();

     if (!newProductCreated) {
        return res.send("Product is not created");
    }
    return res.json({message:'created',newProductCreated});


    } catch (error) {

        console.log("something went wrong", error);
        res.status(500).send("failed to create product");

    }

}


export const getAllProducts = async(req,res)=>{

    const products = await Product.find();

    res.send(products).status(200)

}

export const getProductById = async(req,res) =>{

    const id = req.params.id ; 

    const product = await Product.findOne({_id:id});

    if (product){
        return res.send(product)
    }else{
        return res. send('product is not exist')
    }

}




  
  export const getProductBySearch = async (req, res) => {
  const query = req.query.query; // Get the search query from the request

  console.log(query);
  

  try {
      // Use a regex for a case-insensitive search in the `name` and `description` fields
      const products = await Product.find({
          $or: [
              { name: { $regex: query, $options: "i" } },
              { description: { $regex: query, $options: "i" } },
          ],
      });

      res.json({ success: true, products });
  } catch (error) {
      console.error("Error searching products:", error);
      res.status(500).json({ success: false, message: "Server error" });
  }
};


export const getLatestProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 }).limit(10); // Sort by latest
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
    }
};
  

 export const productByGender = async(req,res)=>{
    try {
        
        const gender = req.params.gender;
        const products = await Product.find({gender});
        res.send(products);

    } catch (error) {
        console.log('error:',error);
    }
 }

 export const productByInterests = async (req,res)=>{

    try {
        const interests = req.params.interests;
        const products = await Product.find({interests});
        res.send(products);

    } catch (error) {
        console.log('error:',error);
    }

 };


 export const updateProduct = async (req, res) => {
    try {
        // console.log(req.files);
        // console.log(req.body);

        const productId = req.params.id; 
        //console.log(productId);
        
        const body = req.body;
        const { name, price, description, category, interests, subcategory, gender, sizes, colors, stock, tags, images } = body;
console.log(images);

        // Find the existing product
        const existingProduct = await Product.findById(productId);

      // console.log(existingProduct);
        
        if (!existingProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        let newImages = existingProduct.images; // Start with existing images

        // If new files are uploaded, upload to Cloudinary
        if (req.files && req.files.length > 0) {
            // Upload new images
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
                                resolve(result.secure_url); // Resolve with the new image URL
                            }
                        );
                        stream.end(file.buffer);
                    })
                )
            );

            newImages = uploadedImages; // Replace images with newly uploaded ones

            // Optional: Delete old images from Cloudinary if needed
            if (existingProduct.images && existingProduct.images.length > 0) {
                existingProduct.images.forEach(async (imageUrl) => {
                    const publicId = imageUrl.split("/").pop().split(".")[0]; // Extract public ID
                    const result = await cloudinaryInstance.uploader.destroy(`product-images/${publicId}`);
                    console.log(`Deleted image ${publicId}:`, result); // Log the response
                    
                    if (result.result !== "ok") {
                        console.log(`Failed to delete image: ${publicId}`);
                    }
                });
            }
        }

        // Update product in MongoDB
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            {
                name,
                price,
                description,
                category,
                subcategory,
                interests,
                gender,
                sizes,
                colors,
                stock,
                images: newImages,
                tags
            },
            { new: true } // Return updated document
        );

        if (!updatedProduct) {
            return res.status(400).json({ message: "Failed to update product" });
        }

        return res.json({ message: "Product updated successfully", updatedProduct });

    } catch (error) {
        console.log("Error updating product:", error);
        res.status(500).json({ message: "Failed to update product" });
    }
};


export const deleteProduct = async(req,res)=>{

    const id = req.params.id ;

    if(!id){
        return res.status(404).json({message:'Product id is Required'})
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    return await res.status(200).json({message:'Product successfully deleted'})



}