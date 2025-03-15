import 'dotenv/config'; // Cleaner import for dotenv
import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import orderRoutes from './routes/order.js';


const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.set('strictQuery', true);
mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
  .then(() => console.log('✅ Connected to MongoDB Database'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

// Start the server
const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => console.log(`🚀 Order Service running on port ${PORT}`));
