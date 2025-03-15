const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/order');
process.removeAllListeners('warning');

const app = express();
app.use(express.json());


// Connect to MongoDB
mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
  .then(() => console.log('Connected to MongoDB Database'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

// Start the server
const PORT = +process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Order Service running on port ${PORT}`));