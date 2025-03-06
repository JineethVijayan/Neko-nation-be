import Bag from "../models/BagModel.js";
import Product from "../models/ProductModel.js";

export const addBag = async (req, res) => {

    try {
        const { userId, productId, size, color, quantity = 1 } = req.body;

        console.log(req.body);


        // Find the product by ID
        const product = await Product.findById(productId);

        console.log(product);

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Validate size and color
        if (!product.sizes.includes(size)) {
            return res
                .status(400)
                .json({ error: `Size ${size} is not available for this product` });
        }
        if (!product.colors.includes(color)) {
            return res
                .status(400)
                .json({ error: `Color ${color} is not available for this product` });
        }

        // Check if a bag exists for the user
        let bag = await Bag.findOne({ user: userId });

        if (bag) {
            // Check if the product with the same size and color already exists in the bag
            const existingItem = bag.items.find(
                (item) =>
                    item.product.toString() === productId &&
                    item.size === size &&
                    item.color === color
            );

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                bag.items.push({ product: productId, size, color, quantity });
            }

            await bag.calculateTotalPrice();
            await bag.save();

            return res.status(200).json({ message: "Item added to bag", bag });
        } else {
            // Create a new bag
            const newBag = new Bag({
                user: userId,
                items: [{ product: productId, size, color, quantity }],
            });

            await newBag.calculateTotalPrice();
            await newBag.save();

            return res.status(201).json({ message: "Bag created", bag: newBag });
        }
    } catch (error) {
        console.error("Error adding item to bag:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const getBag = async (req, res) => {

    try {

        const userId = req.params.id;
        console.log(userId);


        const bag = await Bag.findOne({ user: userId }).populate(
            "items.product",
            "name price images sizes colors"
        );

        if (!bag) {
            return res.status(404).json({ message: "Bag not found" });
        } 

        

        res.status(200).json({ bag});


    } catch (error) {

        console.error("Error fetching bag for user:", error);
        res.status(500).json({ error: "Internal Server Error" });

    }


}




export const updateBagItem = async (req, res) => {
  try {
    const { userId, itemId, size, color, quantity } = req.body;

    // Find the user's bag
    const bag = await Bag.findOne({ user: userId });
    if (!bag) {
      return res.status(404).json({ error: "Bag not found" });
    }

    // Find the specific item in the bag
    const item = bag.items.id(itemId);
    if (!item) {
      return res.status(404).json({ error: "Item not found in the bag" });
    }

    // Update item details
    if (size) item.size = size;
    if (color) item.color = color;
    if (quantity) {
      if (quantity < 1) {
        return res.status(400).json({ error: "Quantity must be at least 1" });
      }
      item.quantity = quantity;
    }

    // Recalculate total price
    await bag.calculateTotalPrice();
    await bag.save();

    const updatedBag = await Bag.findOne({ user: userId }).populate("items.product");
    res.status(200).json({ message: "Bag item updated successfully", bag: updatedBag });
  } catch (error) {
    console.error("Error updating bag item:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



export const deleteBagItem = async (req, res) => {
    try {
      const { userId, itemId } = req.body;
  
      // Find the user's bag
      const bag = await Bag.findOne({ user: userId });
      if (!bag) {
        return res.status(404).json({ error: "Bag not found" });
      }
  
      // Remove the item
      const itemIndex = bag.items.findIndex((item) => item._id.toString() === itemId);
      if (itemIndex === -1) {
        return res.status(404).json({ error: "Item not found in the bag" });
      }
  
      bag.items.splice(itemIndex, 1);
  
      // Recalculate total price and save
      await bag.calculateTotalPrice();
      await bag.save();

      const updatedBag = await Bag.findOne({ user: userId }).populate(
        "items.product",
        "name price images"
      );
  
      res.status(200).json({ message: "Item removed from bag successfully", bag: updatedBag });
  
      
    } catch (error) {
      console.error("Error deleting bag item:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  


  export const getBagById = async (req, res) => {

    try {

        const bagId = req.params.id;
        console.log(bagId);


        const bag = await Bag.findOne({ _id:bagId }).populate(
            "items.product",
            "name price images sizes colors"
        );

        if (!bag) {
            return res.status(404).json({ message: "Bag not found" });
        } 

        

        res.status(200).json({ bag});


    } catch (error) {

        console.error("Error fetching bag for user:", error);
        res.status(500).json({ error: "Internal Server Error" });

    }


}
