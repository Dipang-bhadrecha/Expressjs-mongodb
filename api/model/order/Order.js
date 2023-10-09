const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderDate: Date,
  shippingAddress: String,
  billingAddress: String,
  items: Number,
  total: Number,
  tax: Number,
  shippingCost: Number,
  grandTotal: Number,
  // status -> pending shipped delivered
});

module.exports = mongoose.model("Order", orderSchema);
