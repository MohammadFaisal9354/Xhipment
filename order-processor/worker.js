import "dotenv/config";
import mongoose from "mongoose";
import {
  SQSClient,
  ReceiveMessageCommand,
  DeleteMessageCommand,
} from "@aws-sdk/client-sqs";
import { sendEmail } from "./services/ses.js";
import { Order } from "./models/Order.js";

// Connect to MongoDB
mongoose
  .connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Configure AWS SQS Client
const sqs = new SQSClient({ region: process.env.AWS_REGION });

const processOrder = async (message) => {
  const order = JSON.parse(message.Body);
  try {
    //order processing code goes here

    await Order.findByIdAndUpdate(order._id, { status: "Processed" });

    await sendEmail(
      order.email,
      `🎉 Order Confirmation: #${order._id} Successfully Processed!`,
      `Dear Customer We are thrilled to inform you that your order (#${order._id}) has been successfully processed! 🎊. Thank you for choosing us! If you have any questions, feel free to reach out.`
    );
    console.log(`✅ Order ${order._id} processed successfully`);
  } catch (err) {
    console.error(`❌ Failed to process order ${order._id}:`, err);
    await Order.findByIdAndUpdate(order._id, { status: "Failed" });
  }
};

const startWorker = () => {
  console.log("🚀 Worker has started...");
  const params = {
    QueueUrl: process.env.SQS_QUEUE_URL,
    MaxNumberOfMessages: 10,
    WaitTimeSeconds: 20,
  };

  setInterval(async () => {
    try {
      const { Messages } = await sqs.send(new ReceiveMessageCommand(params));
      if (Messages) {
        for (const message of Messages) {
          await processOrder(message);
          await sqs.send(
            new DeleteMessageCommand({
              QueueUrl: process.env.SQS_QUEUE_URL,
              ReceiptHandle: message.ReceiptHandle,
            })
          );
        }
      }
    } catch (error) {
      console.error("❌ Error receiving messages:", error);
    }
  }, 5000);
};

startWorker();
