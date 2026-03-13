// orderRoutes.js - Handles payment intent creation

const express = require('express');
const router = express.Router();
const stripe = require('../../config/stripe');

// POST /api/order - Create a Stripe Payment Intent
router.post('/', async (req, res) => {
  const { amount, productName } = req.body;

  // Validate amount
  if (!amount || amount < 100) {
    return res.status(400).json({
      success: false,
      message: 'Invalid amount',
    });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'inr',
      metadata: { product_name: productName || 'ShopEasy Product' },
    });

    res.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      amount,
    });

  } catch (error) {
    console.error('Error creating payment intent:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to create payment intent',
    });
  }
});

module.exports = router;