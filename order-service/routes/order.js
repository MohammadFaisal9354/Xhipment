const express = require('express');
const auth = require('../middlewares/auth');
const Order = require('../models/Order');
const Inventory = require('../models/Inventory');
const { sendMessage } = require('../services/sqs');
const { cacheOrder, getCachedOrder } = require('../services/redis');
const router = express.Router();

// Create Order
router.post('/', auth, async (req, res) => {
  const { items, totalAmount } = req.body;
  try {
    for (const item of items) {
      const inventory = await Inventory.findOne({ productId: item.productId });
      if (!inventory || inventory.quantity < item.quantity) {
        return res.status(400).json({ error: 'Item out of stock' });
      }
    }
    const order = new Order({ userId: req.userId, items, totalAmount });
    await order.save();
    await sendMessage(process.env.SQS_QUEUE_URL, order);
    await cacheOrder(order._id, order);
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get Order Details
router.get('/:id', auth, async (req, res) => {
  try {
    const cachedOrder = await getCachedOrder(req.params.id);
    if (cachedOrder) return res.json(cachedOrder);

    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    await cacheOrder(req.params.id, order);
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;