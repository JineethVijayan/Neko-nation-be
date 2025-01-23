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

            const {name,price,description,category,gender,sizes,colors,stock,tags} = body;

     const createProduct = new Product({
        name,
        price,
        description,
        category,
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
        res.send("failed to create product").status(500);

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