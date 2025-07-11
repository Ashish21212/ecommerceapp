const express = require("express");

const {getFilteredProducts,getProductDetails} = require("../../controllers/shop/product-controller");

const router = express.Router();

router.get("/fetch", getFilteredProducts);

router.get('/fetch/:id',getProductDetails);



module.exports = router;
