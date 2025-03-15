const dotenv = require('dotenv');
dotenv.config();
const AWS = require('aws-sdk');
const mongoose = require('mongoose');
const { sendEmail } = require('./services/ses');
const Order = require('./models/Order');
process.removeAllListeners('warning');

// Connect to MongoDB
mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
  .then(() => console.log('Connected to MongoDB Database'))
  .catch(err => console.error('MongoDB connection error:', err));

// Configure AWS
AWS.config.update({ region: process.env.AWS_REGION });
const sqs = new AWS.SQS();

const processOrder = async (message) => {
  const order = JSON.parse(message.Body);
  try {
    // Simulate order processing
    order.status = 'Processed';
    await Order.findByIdAndUpdate(order._id, { status: 'Processed' });
    await sendEmail(
      'technicalkhan786@gmail.com',
      'Order Processed',
      `Your order ${order._id} has been processed.`
    );
    console.log(`Order ${order._id} processed successfully`);
  } catch (err) {
    console.error(`Failed to process order ${order._id}:`, err);
    order.status = 'Failed';
    await Order.findByIdAndUpdate(order._id, { status: 'Failed' });
  }
};

const startWorker = () => {
  console.log("Worker has Started");
  const params = {
    QueueUrl: process.env.SQS_QUEUE_URL,
    MaxNumberOfMessages: 10,
    WaitTimeSeconds: 20,
  };

  setInterval(async () => {
    const data = await sqs.receiveMessage(params).promise();
    if (data.Messages) {
      for (const message of data.Messages) {
        await processOrder(message);
        await sqs.deleteMessage({
          QueueUrl: process.env.SQS_QUEUE_URL,
          ReceiptHandle: message.ReceiptHandle,
        }).promise();
      }
    }
    else console.log("No Messages")
  }, 5000);
};

startWorker();