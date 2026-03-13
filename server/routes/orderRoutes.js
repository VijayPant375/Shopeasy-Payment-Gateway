// orderRoutes.js - Handles payment intent creation

const express = require('express');
const router = express.Router();
const stripe = require('../../config/stripe');

// Product details (in a real app this would come from a database)
const PRODUCT = {
  name: 'Premium Cotton T-Shirt',
  amount: 49900, // Amount in paise (499 * 100)
  currency: 'inr',
};

// POST /api/order - Create a Stripe Payment Intent
router.post('/', async (req, res) => {
  try {
    // Create a payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: PRODUCT.amount,
      currency: PRODUCT.currency,
      metadata: {
        product_name: PRODUCT.name,
      },
    });

    // Send client secret to frontend
    res.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      amount: PRODUCT.amount,
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