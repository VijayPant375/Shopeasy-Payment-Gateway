// verifyPayment.js - Verifies Stripe payment status

const stripe = require('../config/stripe');

/**
 * Verifies that a payment intent was successfully paid
 * @param {string} paymentIntentId - The payment intent ID from Stripe
 * @returns {object} - { success, amount, currency, status }
 */
const verifyPayment = async (paymentIntentId) => {
  try {
    // Retrieve payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    // Check if payment was successful
    if (paymentIntent.status === 'succeeded') {
      return {
        success: true,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        status: paymentIntent.status,
        paymentIntentId: paymentIntent.id,
      };
    } else {
      return {
        success: false,
        status: paymentIntent.status,
        message: 'Payment not completed',
      };
    }

  } catch (error) {
    console.error('Payment verification error:', error.message);
    return {
      success: false,
      message: 'Failed to verify payment',
    };
  }
};

module.exports = verifyPayment;