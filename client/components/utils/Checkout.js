import React from 'react';
import ReactDOM from 'react-dom';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import CardSetupForm from './CardSetupForm';

var stripeElements = function(publicKey, setupIntent) {
    var stripe = Stripe(publicKey);
    var elements = stripe.elements();

const stripePromise = loadStripe('', {
  stripeAccount: '{{CONNECTED_STRIPE_ACCOUNT_ID}}'
});

const Checkout = () => {
  return (
    <Elements stripe={stripePromise}>
      <CardSetupForm />
    </Elements>
  );
};

export default Checkout