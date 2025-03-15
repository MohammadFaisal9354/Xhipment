const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.AWS_REGION });
const sqs = new AWS.SQS();

const sendMessage = (queueUrl, message) => {
  const params = {
    QueueUrl: queueUrl,
    MessageBody: JSON.stringify(message),
  };
  return sqs.sendMessage(params).promise();
};

module.exports = { sendMessage };