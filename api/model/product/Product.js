const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

  productName: String,
  productPrice: Number,
  productDiscount: Number,
  discountedPrice: Number,
  productImage: String,
  productType: mongoose.Types.ObjectId,
});

module.exports = mongoose.model('Product', productSchema);
