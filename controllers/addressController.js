import DeliveryAddress from "../models/AddressModel.js";





// Add a new delivery address



export const addAddress = async (req, res) => {
    const { userId, fullName, phoneNumber, addressLine1, addressLine2, city, state, postalCode, country, isDefault } = req.body;

console.log(req.body);


    try {
        if (isDefault) {
            // If a new address is default, unset the existing default address
            await DeliveryAddress.updateMany({ user: userId }, { $set: { isDefault: false } });
        }

        const address = new DeliveryAddress({
            user: userId,
            fullName,
            phoneNumber,
            addressLine1,
            addressLine2,
            city,
            state,
            postalCode,
            country,
            isDefault,
        });

        await address.save();
        const addresses = await DeliveryAddress.find({ user: userId });
        console.log(addresses);
        
        res.status(201).json({ message: 'Address added successfully', address: addresses });
    } catch (error) {
        console.error('Error adding address:', error);
        res.status(500).json({ message: 'Failed to add address' });
    }
};


// Get all delivery addresses for a user

   export const getAdress =  async (req, res) => {
    try {
      const addresses = await DeliveryAddress.find({ user: req.params.userId });
      res.status(200).json({ addresses });
    } catch (error) {
      console.error('Error fetching addresses:', error);
      res.status(500).json({ message: 'Failed to fetch addresses' });
    }
  };
  

  // Update an address

    
    export const updateAddress = async (req, res) => {
    const { fullName, phoneNumber, addressLine1, addressLine2, city, state, postalCode, country, isDefault } = req.body;
  
    try {
     
      const updatedAddress = await DeliveryAddress.findByIdAndUpdate(
        req.params.id,
        { fullName, phoneNumber, addressLine1, addressLine2, city, state, postalCode, country, isDefault },
        { new: true }
      );
  
      res.status(200).json({ message: 'Address updated successfully', address: updatedAddress });
    } catch (error) {
      console.error('Error updating address:', error);
      res.status(500).json({ message: 'Failed to update address' });
    }
  };

  // Delete an address

    export const deleteAddress = async (req, res) => {
    try {
        const {id} = req.params.id ; 
    const remove =  await DeliveryAddress.deleteOne(id);
    console.log(remove);
    
      res.status(200).json({ message: 'Address deleted successfully' });
    } catch (error) {
      console.error('Error deleting address:', error);
      res.status(500).json({ message: 'Failed to delete address' });
    }
  };
  
  