const Address = require('../../models/Address');

const addAddress = async (req, res) => {
  try {

const { userId, address, city, pincode, phone,notes } = req.body;

if (!userId || !address || !city || !pincode || !phone) {
  return res.status(400).json({
    success: false,
    message: 'Please fill all the fields',
  });
}
    const newlyCreatedAddress = new Address({
       userId,
        address,
        city,
        pincode,
        phone,
        notes
    })

    await newlyCreatedAddress.save();
    res.status(201).json({
      success: true,
      message: 'Address added successfully',
      data: newlyCreatedAddress
    });
  
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err,
    });
  }
};

const fetchAllAddress = async (req, res) => {
  try {
     const { userId } = req.params;
     if (!userId) {
       return res.status(400).json({
         success: false,
         message: 'User ID is required',
       });
     }

     const addressList = await Address.find({ userId });
     res.status(200).json({
       success: true,
       data: addressList,
     });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err,
    });
  }
};

const editAddress = async (req, res) => {
  try {

    const { userId, addressId } = req.params;
    const formData = req.body;
     if (!userId || !addressId) {
       return res.status(400).json({
         success: false,
         message: 'User ID and Address ID are required',
       });
     }

     const address = await Address.findOneAndUpdate({
       _id: addressId,userId

     },formData, { new: true });
     if (!address) {
       return res.status(404).json({
         success: false,
         message: 'Address not found',
       });
     }   
     res.status(200).json({
       success: true,
       message: 'Address updated successfully',
       data: address,
     });
    
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err,
    });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    
     if (!userId || !addressId) {
       return res.status(400).json({
         success: false,
         message: 'User ID and Address ID are required',
       });
     }

     const address = await Address.findOneAndDelete({
       _id: addressId, userId
     });
     if (!address) {
       return res.status(404).json({
         success: false,
         message: 'Address not found',
       });
     }
     res.status(200).json({
       success: true,
       message: 'Address deleted successfully',
     });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err,
    });
  }
};

module.exports = {
  addAddress,
  fetchAllAddress,
  editAddress,
  deleteAddress,
};
 