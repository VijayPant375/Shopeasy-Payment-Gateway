<div align="center">

# 🛍️ Shopeasy Payment Gateway

**A full-stack payment gateway integration demo built with Node.js, Express, and Stripe — featuring real checkout, server-side verification, dark mode, and a clean responsive UI.**

[![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Framework-Express-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com)
[![Stripe](https://img.shields.io/badge/Payments-Stripe-635BFF?style=flat-square&logo=stripe&logoColor=white)](https://stripe.com)
[![Deployed on Render](https://img.shields.io/badge/Deployed%20on-Render-46E3B7?style=flat-square&logo=render&logoColor=white)](https://shopeasy-payment-gateway.onrender.com)

🔗 [Live Demo](https://shopeasy-payment-gateway.onrender.com)

</div>

---

## 📖 Overview

**ShopEasy** is a production-style e-commerce payment demo that simulates a real online store with full Stripe integration. It demonstrates the complete payment lifecycle — from order creation on the backend to cryptographic verification after checkout — built with clean, readable full-stack code.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🛒 Product Store | 4 products with dynamic pricing and a responsive grid layout |
| 💳 Stripe Checkout | Payment form embedded directly on the page using Stripe Elements |
| 🔐 Payment Verification | Server-side verification of payment intent status via Stripe API |
| ✅ Success Page | Order confirmation page with real Stripe Payment ID |
| 🌙 Dark Mode | Persistent dark/light mode toggle using localStorage |
| 📱 Responsive Design | Fully mobile-friendly layout |
| 🔒 Secure by Design | API keys stored server-side, never exposed to the client |

---

## 🏗️ Payment Flow
```
User clicks Buy Now
        │
        ▼
Frontend calls POST /api/order
        │
        ▼
Backend creates Stripe Payment Intent
        │
        ▼
Stripe Elements payment form mounts
        │
        ▼
User enters card details and submits
        │
        ▼
Stripe redirects to /success.html
        │
        ▼
Frontend calls POST /api/verify
        │
        ▼
Backend verifies payment with Stripe API
        │
        ▼
Success page displays order confirmation
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Backend | Node.js, Express |
| Payment Gateway | Stripe API (Test Mode) |
| Deployment | Render |
| Dev Tools | Nodemon, Dotenv |

---

## 📁 Project Structure
```
shopeasy-payment-gateway/
├── client/
│   ├── index.html          ← Product listing page
│   ├── success.html        ← Payment success page
│   ├── style.css           ← All styles + dark mode
│   ├── script.js           ← Stripe checkout logic
│   └── success.js          ← Frontend payment verification
├── server/
│   ├── server.js           ← Express app entry point
│   └── routes/
│       ├── orderRoutes.js  ← POST /api/order
│       └── verifyRoutes.js ← POST /api/verify
├── config/
│   └── stripe.js           ← Stripe instance setup
├── utils/
│   └── verifyPayment.js    ← Payment verification utility
├── .env.example
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- Stripe account (free test mode)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/VijayPant375/Shopeasy-Payment-Gateway.git
cd Shopeasy-Payment-Gateway
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` and add your Stripe test keys:
```
PORT=3000
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
```

4. **Add your publishable key to `client/script.js`**
```javascript
const stripe = Stripe('pk_test_your_key_here');
```

5. **Start the development server**
```bash
npm run dev
```

6. **Open your browser**
```
http://localhost:3000
```

---

## 💳 Test Payments

Use these Stripe test card details — no real money is charged:

| Field | Value |
|---|---|
| Card Number | `4242 4242 4242 4242` |
| Expiry Date | Any future date |
| CVC | Any 3 digits |
| Name | Any name |

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Server health check |
| POST | `/api/order` | Create Stripe payment intent |
| POST | `/api/verify` | Verify payment status |

---

## 🔐 Security

- Stripe secret key is stored server-side only and never exposed to the client
- Payment verification is performed server-side via Stripe API
- Environment variables are never committed to version control

---

## 📬 Contributing

Contributions, bug reports, and feature requests are welcome. Please open an issue or submit a pull request.

---

<div align="center">

Built by [Vijay Pant](https://github.com/VijayPant375)

</div>