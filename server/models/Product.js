const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

  image:String,
  title:String,
  description:String,
  category:String,
  brand:String,
  price:Number,
  salePrice:Number,
  totalStock:Number,

},{timestamps:true}); //Adds createdAt and updatedAt automatically to each product.

module.exports = mongoose.model('Product', productSchema);