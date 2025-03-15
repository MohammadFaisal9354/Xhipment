import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';

const sqsClient = new SQSClient({ region: process.env.AWS_REGION });

export const sendMessage = async (queueUrl, message) => {
  try {
    const params = {
      QueueUrl: queueUrl,
      MessageBody: JSON.stringify(message),
      MessageGroupId: 'orderGroup', // Required for FIFO queues
      MessageDeduplicationId: `order-${message._id}`, // Required for FIFO queues
    };
    const command = new SendMessageCommand(params);
    const response = await sqsClient.send(command);
    console.log('✅ Message sent successfully:', response.MessageId);
    return response;
  } catch (err) {
    console.error('❌ Failed to send SQS message:', err);
    throw err;
  }
};