const env = require('dotenv').config({ path: './.env' });
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const express = require('express');
const router = express();
const {
  userAuth: { requireToken: requireUserToken },
} = require('./auth.js');

// getting error that jwt is required here & setup intent is not successful
// router.get('/card-wallet', requireUserToken, async (req, res, next) => {
//   try {
//     const customerId = req.user.stripeId
//     const intent =  await stripe.setupIntents.create({
//       customer: customerId,
//     });
//     res.send(intent.client_secret);

//   }
//   catch (ex) {
//     next(ex)
//   }
// });

let customer;
router.get('/card-wallet', async (req, res, next) => {
  try {
    customer = await stripe.customers.create();
    const intent = await stripe.setupIntents.create({
      customer: customer.id,
    });
    res.send(intent.client_secret);
  } catch (ex) {
    next(ex);
  }
});

router.post('/charge-card', async (req, res, next) => {
  let paymentIntent;
  try {
    // List the customer's payment methods to find one to charge
    const paymentMethods = await stripe.paymentMethods.list({
      customer: customer.id,
      type: 'card',
    });

    // Create and confirm a PaymentIntent with the order amount, currency,
    // Customer and PaymentMethod ID
    paymentIntent = await stripe.paymentIntents.create({
      amount: 1000, // this we can pull
      currency: 'usd',
      payment_method: paymentMethods.data[0].id,
      customer: customer.id,
      off_session: true,
      confirm: true,
    });

    res.send({
      succeeded: true,
      clientSecret: paymentIntent.client_secret,
      publicKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
