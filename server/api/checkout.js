const env = require("dotenv").config({ path: "./.env" });
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const express = require('express');
const router = express();
const {
  userAuth: { requireToken: requireUserToken },
} = require('./auth.js');
const {
  models: { Tab },
} = require('../db/index.js');

// let customer;
router.get('/card-wallet', requireUserToken, async (req, res, next) => {
  try {
    
    const customerId = req.user.stripeId
    const userId = req.user.id
    console.log(req.user)
    //customer = await stripe.customers.create();

    const intent =  await stripe.setupIntents.create({
      //customer: customer.id,
      customer: customerId
    });

    // if no tab open, create a tab

    const tab = Tab.findOne({where: {userId: userId} })
    if (!tab) {
      await Tab.create({userId})
    }
    

    res.send(intent.client_secret);

  }
  catch (ex) {
    next(ex)
  }
});

router.post("/charge-card", requireUserToken, async (req, res, next) => {
  let paymentIntent
  const customerId = req.user.stripeId
  const userId = req.user.id
  try {
    // List the customer's payment methods to find one to charge
    const paymentMethods = await stripe.paymentMethods.list({
      //customer: customer.id,
      customer: customerId,
      type: "card"
    });

    // Create and confirm a PaymentIntent with the order amount, currency, 
    // Customer and PaymentMethod ID
    paymentIntent = await stripe.paymentIntents.create({
      amount: 1000, // this we can pull
      currency: "usd",
      payment_method: paymentMethods.data[0].id,
      // customer: customer.id,
      customer: customerId,
      off_session: true,
      confirm: true
    });

    const tab = await Tab.findOne({ where: { userId: userId }})
    console.log(tab)
    tab.status = 'closed'
    tab.save()

    res.send({
      succeeded: true,
      clientSecret: paymentIntent.client_secret,
      publicKey: process.env.STRIPE_PUBLISHABLE_KEY
    });
  } catch (err) {
      next(err)
  }
});

// closes tab

module.exports = router;