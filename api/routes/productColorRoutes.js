const express = require('express');
const router = express.Router();
const productColor = require('../controller/product/productColorController');

// Create a new color
router.post('/product-color', productColor.createProductColor);

module.exports = router;