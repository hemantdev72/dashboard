const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { 
    type: String, 
    required: true, 
    enum: ['Electronics', 'Clothing', 'Home Goods', 'Food', 'Other'] 
  },
  description: { type: String, default: '' },
  sustainabilityScore: { type: Number, min: 0, max: 100, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', productSchema);
