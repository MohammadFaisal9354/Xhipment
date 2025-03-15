import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{ productId: String, quantity: Number }],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Processed', 'Failed'], default: 'Pending' },
});

export const Order= mongoose.model('Order', orderSchema);