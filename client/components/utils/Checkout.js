import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import CardSetupForm from './CardSetupForm';

const stripeElements = function(publicKey, setupIntent) {
    const stripe = Stripe('pk_test_51IvtaYFkob7fZ9T0uLozxOC3cAPrDRZzVn8FJSav6aVr9SWu5flNYUi5RlNIK3nimDNQSQr4DGs2EDGJPo8v8NrF00URtmrPHH');
    const elements = stripe.elements();
    // const setupIntent = (publicKey) => {
    //     return await axios.post('/create-setup-intent')
    // }
}

const stripePromise = loadStripe('pk_test_51IvtaYFkob7fZ9T0uLozxOC3cAPrDRZzVn8FJSav6aVr9SWu5flNYUi5RlNIK3nimDNQSQr4DGs2EDGJPo8v8NrF00URtmrPHH', {
  stripeAccount: '{{CONNECTED_STRIPE_ACCOUNT_ID}}'
});


// stripe.confirmCardPayment(intent.client_secret, {
//     payment_method: intent.last_payment_error.payment_method.id
//   }).then(function(result) {
//     if (result.error) {
//       // Show error to your customer
//       console.log(result.error.message);
//     } else {
//       if (result.paymentIntent.status === 'succeeded') {
//         // The payment is complete!
//       }
//     }
//   });

const Checkout = () => {
  return (
    <Elements stripe={stripePromise}>
      <CardSetupForm />
    </Elements>
  );
};

export default Checkout