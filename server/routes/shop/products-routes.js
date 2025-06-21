const express = require("express");

const getFilteredProducts = require("../../controllers/shop/product-controller");

const router = express.Router();

router.get("/fetch", getFilteredProducts);

module.exports = router;
