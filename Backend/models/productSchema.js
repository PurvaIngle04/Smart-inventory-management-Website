// models/Product.js
const mongoose = require('mongoose');

const product = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true,
  },
  productName: {
    type: String,
    required: true,
  },
  brandName: String,
  category: String,
  originalPrice: {
    type: Number,
    required: true,
  },
  discountedPrice: Number,
  expiryDate: Date,
  stockAvailable: {
    type: Number,
    required: true,
  },
  manufacturer: String,
  batchNumber: String,
  locationInStore: String,
  supplier: String,
  reorderLevel: Number,
}, { timestamps: true });

module.exports = mongoose.model('Product', product);
