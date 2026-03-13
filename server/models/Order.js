// verifyRoutes.js - Handles payment verification and order update

const express = require('express');
const router = express.Router();
const verifyPayment = require('../../utils/verifyPayment');
const Order = require('../models/Order');

// POST /api/verify - Verify payment and update order status
router.post('/', async (req, res) => {
  const { paymentIntentId } = req.body;

  if (!paymentIntentId) {
    return res.status(400).json({
      success: false,
      message: 'Payment Intent ID is required',
    });
  }

  try {
    const result = await verifyPayment(paymentIntentId);

    if (result.success) {
      // Update order status in MongoDB
      await Order.findOneAndUpdate(
        { paymentIntentId },
        { status: 'success' },
        { new: true }
      );

      return res.json({
        success: true,
        message: 'Payment verified successfully',
        amount: result.amount,
        currency: result.currency,
        paymentIntentId: result.paymentIntentId,
      });

    } else {
      // Mark order as failed
      await Order.findOneAndUpdate(
        { paymentIntentId },
        { status: 'failed' },
      );

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