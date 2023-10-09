const mongoose = require('mongoose');

const productColorSchema = new mongoose.Schema({
  colorName: mongoose.Types.ObjectId,
});

module.exports = mongoose.model('ProductColor', productColorSchema);
