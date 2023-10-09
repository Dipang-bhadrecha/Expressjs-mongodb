const express = require("express");
const router = express.Router();
const orderController = require('../controller/order/orderController');

// Create a new oreder
router.post("/order/create", orderController.createOrder);

module.exports = router;                                            