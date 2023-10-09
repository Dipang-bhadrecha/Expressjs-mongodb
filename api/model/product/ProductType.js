const mongoose = require('mongoose');

const productTypeSchema = new mongoose.Schema({
  productTypeName: String, 
  color: String, 
});

module.exports = mongoose.model('ProductType', productTypeSchema);
