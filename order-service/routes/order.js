import express from 'express';
import {auth} from '../middlewares/auth.js';
import {Order} from '../models/Order.js';
import {User} from '../models/User.js'
import {Inventory} from '../models/Inventory.js';
import { sendMessage } from '../services/sqs.js';
import { cacheOrder, getCachedOrder } from '../services/redis.js';


const router = express.Router();


// Create Order
router.post('/', auth, async (req, res) => {
  const { items, totalAmount } = req.body;
  if(!items|| !Array.isArray(items)||items.length==0){
    return res.status(400).json({ error: 'No items for creating an order' });
  }
  const user = await User.findById(req.userId);
  try {
    for (const item of items) {
      const inventory = await Inventory.findOne({ productId: item.productId });
      if (!inventory || inventory.quantity < item?.quantity) {
        return res.status(400).json({ error: 'Item out of stock' });
      }
    }
    const order = new Order({ userId: req.userId, items, totalAmount });
    await order.save();
    await sendMessage(process.env.SQS_QUEUE_URL,  {
      _id:order._id,
      email:user.email,
      userId:order.userId,
      items:order.items,
      totalAmount:order.totalAmount,
    
    });
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

//Insert products in inventory
router.post('/inventory/add-products', auth, async (req, res) => {
  try {
    // Define 10 products to insert
    const products = [
      { productId: 'prod001', quantity: 100 },
      { productId: 'prod002', quantity: 200 },
      { productId: 'prod003', quantity: 150 },
      { productId: 'prod004', quantity: 50 },
      { productId: 'prod005', quantity: 300 },
      { productId: 'prod006', quantity: 80 },
      { productId: 'prod007', quantity: 120 },
      { productId: 'prod008', quantity: 250 },
      { productId: 'prod009', quantity: 400 },
      { productId: 'prod010', quantity: 600 },
    ];

    // Insert bulk products into the database
    const result = await Inventory.insertMany(products);

    // Send success response
    res.status(201).json({
      message: 'Products added to inventory successfully',
      data: result
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to add products to inventory',
      error: error.message
    });
  }
});

export default router;