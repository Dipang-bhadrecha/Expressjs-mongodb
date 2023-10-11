const express = require('express');
const router = express.Router();
const productController = require("../controller/product/productController");

// Create a new product
router.post('/products/create', productController.createProduct);

// Get product details by ID
router.get('/products/productDetails', productController.getProductwithDetails);


module.exports = router;
