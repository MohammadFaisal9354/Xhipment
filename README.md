# Order Service & Order Processor

## 📌 Project Overview
This project consists of two services:
- **Order Service**: Handles order-related operations.
- **Order Processor**: Processes orders from the queue and sends email notifications.

Both services rely on AWS and MongoDB for storage and messaging.

---

## 🚀 Getting Started
### 1️⃣ Clone the Repository
```sh
git clone <repository-url>
cd <repository-folder>
```

### 2️⃣ Setup Environment Variables
Each service requires an `.env` file with specific environment variables. Below are the required configurations:

---

## 🌍 Environment Variables
### 🔹 Order Service
Create a `.env` file inside the **Order Service** directory and add the following:
```ini
PORT=3001
MONGODB_URI=<your-mongodb-uri>
DB_NAME="order"
REDIS_URL=<your-redis-url>
JWT_ACCESS_TOKEN_SECRET="%hd9$@#(^d(f^h(%cd)s)z)"
JWT_REFRESH_TOKEN_SECRET=")z)s)dc%(h^f(d^(#@$9dh%"
AWS_ACCESS_KEY_ID=<your-aws-access-key-id>
AWS_SECRET_ACCESS_KEY=<your-aws-secret-access-key>
AWS_REGION="us-east-1"
SQS_QUEUE_URL="https://sqs.us-east-1.amazonaws.com/1234567890/order-processing.fifo"
```

### 🔹 Order Processor
Create a `.env` file inside the **Order Processor** directory and add the following:
```ini
MONGODB_URI=<your-mongodb-uri>
DB_NAME="order"
AWS_ACCESS_KEY_ID=<your-aws-access-key-id>
AWS_SECRET_ACCESS_KEY=<your-aws-secret-access-key>
AWS_REGION=us-east-1
SQS_QUEUE_URL=https://sqs.us-east-1.amazonaws.com/1234567890/order-processing.fifo
SES_SENDER_EMAIL=faisalkhan9354@gmail.com
```

---

## 🛠 Installation & Running the Services
### 🔹 Order Service
Navigate to the **Order Service** folder and run:
```sh
npm install
node app.js
```

### 🔹 Order Processor
Navigate to the **Order Processor** folder and run:
```sh
npm install
node worker.js
```

---

## 📬 API Endpoints
### Order Service API (Example)
| Method | Endpoint       | Description          |
|--------|--------------|----------------------|
| POST   | /orders      | Create a new order  |
| GET    | /orders/:id  | Get order by ID     |



---

## 📦 Tech Stack
- **Node.js** – Backend runtime
- **MongoDB** – Database
- **Redis** – Caching
- **AWS SQS** – Message queue
- **AWS SES** – Email service
- **JWT** – Authentication

---

## 🤝 Contribution Guidelines
1. Fork the repository.
2. Create a new branch (`feature/your-feature`).
3. Commit your changes.
4. Push to your branch.
5. Create a pull request.

---

## 📄 License
This project is open-source under the [MIT License](LICENSE).

---

## 📧 Contact
For any queries, reach out at **faisalkhan9354@gmail.com**.

---

## 📜 API Documentation
A Postman Collection is provided in the repository to test the API endpoints. Simply import it into Postman to get started!

---

🚀 Happy Coding! 🎉

