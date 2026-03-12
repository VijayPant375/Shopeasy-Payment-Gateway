// razorpay.js - Initializes and exports the Razorpay instance

const Razorpay = require('razorpay');

// Create Razorpay instance using API keys from .env
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

module.exports = razorpayInstance;