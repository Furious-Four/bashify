const env = require("dotenv").config({ path: "./.env" });

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const express = require('express');
const expressHandlebars = require('express-handlebars');

const router = express();

router.engine('.hbs', expressHandlebars({ extname: '.hbs' }));
router.set('view engine', '.hbs');
router.set('views', './views');

router.get('/card-wallet', async (req, res) => {
    const customer = await stripe.customers.create();

    const intent =  await stripe.setupIntents.create({
        customer: customer.id,
    });
    res.render('card_wallet', { client_secret: intent.client_secret });
});


module.exports = router;