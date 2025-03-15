import { createClient } from 'redis';

const client = createClient({ url: process.env.REDIS_URL ,});

// Handle Redis connection errors
client.on('error', (err) => console.error('❌ Redis Error:', err));

(async () => {
  try {
    await client.connect();
    console.log('✅ Connected to Redis');
  } catch (err) {
    console.error('❌ Failed to connect to Redis:', err);
  }
})();

// Cache an order for 10 minutes (600 seconds)
export const cacheOrder = async (orderId, order) => {
  try {
    await client.setEx(`order:${orderId}`, 600, JSON.stringify(order));
  } catch (err) {
    console.error('❌ Failed to cache order:', err);
  }
};

// Retrieve an order from cache
export const getCachedOrder = async (orderId) => {
  try {
    const order = await client.get(`order:${orderId}`);
    return order ? JSON.parse(order) : null;
  } catch (err) {
    console.error('❌ Failed to get order from cache:', err);
    return null;
  }
};

// Graceful shutdown
export const disconnectRedis = async () => {
  try {
    await client.quit();
    console.log('✅ Redis connection closed');
  } catch (err) {
    console.error('❌ Error closing Redis connection:', err);
  }
};
