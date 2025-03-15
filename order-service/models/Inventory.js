import mongoose from "mongoose";


const inventorySchema = new mongoose.Schema({
  productId: { type: String, required: true, unique: true },
  quantity: { type: Number, required: true },
});

export const Inventory  = mongoose.model('Inventory', inventorySchema);