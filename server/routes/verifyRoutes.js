// verifyRoutes.js - Handles payment verification

const express = require('express');
const router = express.Router();
const verifyPayment = require('../../utils/verifyPayment');

// POST /api/verify - Verify payment status with Stripe
router.post('/', async (req, res) => {
  const { paymentIntentId } = req.body;

  // Check if paymentIntentId was provided
  if (!paymentIntentId) {
    return res.status(400).json({
      success: false,
      message: 'Payment Intent ID is required',
    });
  }

  try {
    // Verify payment using utility function
    const result = await verifyPayment(paymentIntentId);

    if (result.success) {
      return res.json({
        success: true,
        message: 'Payment verified successfully',
        amount: result.amount,
        currency: result.currency,
        paymentIntentId: result.paymentIntentId,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: result.message || 'Payment verification failed',
      });
    }

  } catch (error) {
    console.error('Verify route error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

module.exports = router;