Add these ENV Variables for order Service </br>
PORT=3001  </br>
MONGODB_URI </br>
DB_NAME="order"  </br>
REDIS_URL  </br>
JWT_ACCESS_TOKEN_SECRET="%hd9$@#(^d(f^h(%cd)s)z)" </br>
JWT_REFRESH_TOKEN_SECRET=")z)s)dc%(h^f(d^(#@$9dh%" </br>
AWS_ACCESS_KEY_ID  </br>
AWS_SECRET_ACCESS_KEY    </br>
AWS_REGION="us-east-1"  </br>
SQS_QUEUE_URL="https://sqs.us-east-1.amazonaws.com/1234567890/order-processing.fifo"  </br>

</br>
</br>
</br>

Add these ENV Variables for order processor </br>
MONGODB_URI  </br>
DB_NAME="order"  </br>
AWS_ACCESS_KEY_ID  </br>
AWS_SECRET_ACCESS_KEY  </br>
AWS_REGION=us-east-1  </br>  
SQS_QUEUE_URL=https://sqs.us-east-1.amazonaws.com/1234567890/order-processing.fifo  </br>
SES_SENDER_EMAIL=faisalkhan9354@gmail.com  </br>

</br>
</br>
</br>

For Run locally clone this repo and open in each folder seperately  </br>
For Order Service </br>
Add ENV File with above given variables
npm install  </br>
node app.js   </br>

</br>
</br>
For Order Processor </br>
Add ENV File with above given variables
</br>
npm intall </br>
node worker.js   </br>
