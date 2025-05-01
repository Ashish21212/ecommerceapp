const imageUploadUtils = require('./../../helpers/cloudinary').imageUploadUtils
const Product = require('./../../models/Product');

const handleImageUpload = async (req, res) => {

  try{
 const b64 =Buffer.from(req.file.buffer).toString('base64');
 const url = 'data:' + req.file.mimetype + ';base64,' + b64;
 const result = await imageUploadUtils(url);
 console.log(req.file, 'req.file');

 res.json({
  success: true,
  message: "Image uploaded successfully",
  result
 })

  }catch(error){
    console.log(error);
    res.status(500)
    .json({
      success: false,
      message: "Internal server error"
    });
  }
}

// add a new product
const addProduct = async (req, res) => {
  try{
  const {
    image,
    title,
    description,
    price,
    salePrice,
    category,
    brand,
    totalStock
  } = req.body;
  const newlyCreatedProduct = new Product({
    image,
    title,
    description,
    price,
    salePrice,
    category,
    brand,
    totalStock
  })
  await newlyCreatedProduct.save();
  res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: newlyCreatedProduct
  })
  }
  catch(err){
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });

  }
}

  
//fetch all products
const fetchAllProducts = async (req, res) => {
  try{
const listOfProducts = await Product.find({});
res.status(200).json({
  success: true,
  data: listOfProducts
})
  }
  catch(err){
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });

  }
}
// edit a product
const editProduct = async (req, res) => {
  try{
  const {id} = req.params;
  const {
    image,
    title,
    description,
    price, 
    salePrice,
    category,
    brand,
    totalStock
  } = req.body;
let findProduct = await Product.findById(id);
  if(!findProduct){
    return res.status(404).json({
      success: false,
      message: "Product not found"
    })
  }
    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.price = price===''?0:price || findProduct.price;
    findProduct.category = category || findProduct.category;
    findProduct.salePrice = salePrice===''?0:salePrice || findProduct.salePrice;
    findProduct.brand = brand || findProduct.brand;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    findProduct.image = image || findProduct.image;
    await findProduct.save();
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: findProduct
    })
  
 }
  catch(err){
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });

  }
}
// delete a product
const deleteProduct = async (req, res) => {
  try{
    const {id} = req.params;
    const product = await Product.findByIdAndDelete(id);

    if(!product){
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }
    
      res.status(200).json({
        success: true,
        message: "Product deleted successfully",
        data: product
       
       
        
      })
     

  
  }
  catch(err){
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });

  }
}
module.exports = {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct
}