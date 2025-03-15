const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.AWS_REGION });
const ses = new AWS.SES();

const sendEmail = async (to, subject, body) => {
  const params = {
    Destination: { ToAddresses: [to] },
    Message: {
      Body: { Text: { Data: body } },
      Subject: { Data: subject },
    },
    Source: process.env.SES_SENDER_EMAIL,
  };
  return ses.sendEmail(params).promise();
};

module.exports = { sendEmail };