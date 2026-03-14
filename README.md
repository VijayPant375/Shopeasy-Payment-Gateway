# ShopEasy — Payment Gateway Integration Demo

A full-stack payment gateway integration demo built with **Node.js**, **Express**, and **Stripe**. Simulates a real online store with secure checkout, payment verification, and a clean responsive UI with dark mode support.

---

## Live Demo

> Run locally following the setup guide below.

---

## Features

- Browse multiple products with dynamic pricing
- Secure Stripe checkout integrated directly on the page
- Backend payment intent creation via Express API
- Cryptographic payment verification on the server
- Payment success page with order confirmation
- Dark mode with persistence across pages
- Fully responsive design for mobile and desktop

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Backend | Node.js, Express |
| Payment | Stripe API (Test Mode) |
| Dev Tools | Nodemon, Dotenv |

---

## Project Structure
```
payment-demo/
├── client/
│   ├── index.html        ← Product listing page
│   ├── success.html      ← Payment success page
│   ├── style.css         ← All styles + dark mode
│   ├── script.js         ← Stripe checkout logic
│   └── success.js        ← Payment verification on frontend
├── server/
│   ├── server.js         ← Express app entry point
│   └── routes/
│       ├── orderRoutes.js   ← POST /api/order
│       └── verifyRoutes.js  ← POST /api/verify
├── config/
│   └── stripe.js         ← Stripe instance setup
├── utils/
│   └── verifyPayment.js  ← Payment verification utility
├── .env.example          ← Environment variable template
├── package.json
└── README.md
```

---

## Payment Flow
```
User clicks Buy Now
       ↓
Frontend calls POST /api/order
       ↓
Backend creates Stripe Payment Intent
       ↓
Frontend mounts Stripe payment form
       ↓
User enters card details and pays
       ↓
Stripe redirects to /success.html
       ↓
Frontend calls POST /api/verify
       ↓
Backend verifies payment with Stripe
       ↓
Success page shows order confirmation
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- Stripe account (free test mode)

### Installation

1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/payment-demo.git
cd payment-demo
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```

Edit `.env` and add your Stripe test keys:
```
PORT=3000
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
```

4. Add your publishable key to `client/script.js`
```javascript
const stripe = Stripe('pk_test_your_key_here');
```

5. Start the server
```bash
npm run dev
```

6. Open your browser
```
http://localhost:3000
```

---

## Test Payments

Use these Stripe test card details:

| Field | Value |
|---|---|
| Card Number | `4242 4242 4242 4242` |
| Expiry | Any future date |
| CVC | Any 3 digits |
| Name | Any name |

> No real money is charged in test mode.

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Server health check |
| POST | `/api/order` | Create Stripe payment intent |
| POST | `/api/verify` | Verify payment status |

---

## Author

Built by VijayPant375(https://github.com/VijayPant375)