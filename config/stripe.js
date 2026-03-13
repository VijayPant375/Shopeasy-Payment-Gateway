// stripe.js - Initializes and exports the Stripe instance

const Stripe = require('stripe');

// Create Stripe instance using secret key from .env
const stripeInstance = Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = stripeInstance;