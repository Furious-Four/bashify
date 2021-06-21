const env = require("dotenv").config({ path: "./.env" });

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const express = require('express');

const router = express();

router.post("/create-setup-intent", async (req, res) => {
    // Create or use an existing Customer to associate with the SetupIntent.
    // The PaymentMethod will be stored to this Customer for later use.
    const customer = await stripe.customers.create();
  
    res.send(await stripe.setupIntents.create({
      customer: customer.id
    }));
});

// const paymentMethods = await stripe.paymentMethods.list({
//     customer: '{{CUSTOMER_ID}}',
//     type: 'card',
//   }); 


module.exports = router;