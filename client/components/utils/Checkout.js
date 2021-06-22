import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import CardSetupForm from './CardSetupForm';

const stripePromise = loadStripe('pk_test_51IvtaYFkob7fZ9T0uLozxOC3cAPrDRZzVn8FJSav6aVr9SWu5flNYUi5RlNIK3nimDNQSQr4DGs2EDGJPo8v8NrF00URtmrPHH', {
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