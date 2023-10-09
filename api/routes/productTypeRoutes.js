const express = require('express');
const router = express.Router();
const productTypeController = require('../controller/product/productTypeController');

// Create a new product type
router.post('/product-types', productTypeController.createProductType);

module.exports = router;
