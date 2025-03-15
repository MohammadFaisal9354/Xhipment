const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  productId: { type: String, required: true, unique: true },
  quantity: { type: Number, required: true },
});

module.exports = mongoose.model('Inventory', inventorySchema);