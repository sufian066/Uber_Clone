// backend/services/stripeService.js

const stripe = require('../config/paymentConfig');

/**
 * Create a Stripe payment intent
 * @param {number} amount - amount in INR, e.g., 500 for ₹500
 * @param {string} currency - currency code, default 'inr'
 * @param {string} customerEmail - rider's email (optional)
 * @returns {Promise<Object>} paymentIntent
 */
async function createPaymentIntent(amount, customerEmail, currency = 'inr') {
  try {
    const intent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe expects amount in paise
      currency,
      receipt_email: customerEmail,
      payment_method_types: ['card']
    });
    return intent;
  } catch (err) {
    throw new Error('Failed to create payment intent');
  }
}

/**
 * Retrieve a Stripe payment intent by its ID
 * @param {string} intentId
 * @returns {Promise<Object>} paymentIntent
 */
async function getPaymentIntent(intentId) {
  try {
    return await stripe.paymentIntents.retrieve(intentId);
  } catch (err) {
    throw new Error('Failed to retrieve payment intent');
  }
}

module.exports = {
  createPaymentIntent,
  getPaymentIntent
};
