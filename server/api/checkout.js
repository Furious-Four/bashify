const env = require('dotenv').config({ path: './.env' });

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const express = require('express');

const router = express();

// router.post("/create-setup-intent", async (req, res) => {
//     // Create or use an existing Customer to associate with the SetupIntent.
//     // The PaymentMethod will be stored to this Customer for later use.
//     const customer = await stripe.customers.create();

//     const client_secret = await stripe.setupIntents.create({
//       customer: customer.id
//     })

//     console.log('client secret', client_secret)

//     res.send(client_secret);
// });

router.get('/card-wallet', async (req, res) => {
  const customer = await stripe.customers.create();

  const intent = await stripe.setupIntents.create({
    customer: customer.id,
  });

  res.send('card_wallet', { client_secret: intent.client_secret });
});

// const paymentMethods = await stripe.paymentMethods.list({
//     customer: '{{CUSTOMER_ID}}',
//     type: 'card',
// });

module.exports = router;
