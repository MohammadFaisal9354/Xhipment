import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const sesClient = new SESClient({ region: process.env.AWS_REGION });

export const sendEmail = async (to, subject, body) => {
  try {
    const params = {
      Destination: { ToAddresses: [to] },
      Message: {
        Body: { Text: { Data: body } },
        Subject: { Data: subject },
      },
      Source: process.env.SES_SENDER_EMAIL, 
    };
    const command = new SendEmailCommand(params);
    const response = await sesClient.send(command);
    console.log('✅ Email sent successfully:', response.MessageId);
    return response;
  } catch (err) {
    console.error('❌ Failed to send email:', err);
    throw err;
  }
};