const redis = require('redis');
const client = redis.createClient({ url: process.env.REDIS_URL });

client.on('error', (err) => console.error('Redis error:', err));
client.connect();

const cacheOrder = async (orderId, order) => {
  await client.setEx(`order:${orderId}`, 600, JSON.stringify(order));
};

const getCachedOrder = async (orderId) => {
  const order = await client.get(`order:${orderId}`);
  return order ? JSON.parse(order) : null;
};

module.exports = { cacheOrder, getCachedOrder };