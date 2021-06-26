/* eslint-disable no-unused-vars */
import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import CardSection from './CardSection.js';
import { Form } from '../../styles/CheckoutStyles.js';
import { Button } from '../../styles/GlobalStyle.js';

export default function CardSetupForm() {
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const token = window.localStorage.getItem('token');
    const { data: client_secret } = await axios.get(
      '/api/checkout/card-wallet',
      { headers: { authorization: token } }
    );
    //console.log(client_secret)
    const result = await stripe.confirmCardSetup(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        // billing_details: {
        //   we can add billing details if we want cardholderName.value
        // },
      },
    });
    if (result.error) {
      console.log('setupIntent not successful');
    } else {
      // The setup has succeeded. Display a success message and send
      // result.setupIntent.payment_method to your server to save the
      // card to a Customer
      alert('tab opened!');
      console.log(result.setupIntent.payment_method);
    }
  };

  const createTabDrinks = async () => {
    try {
      const token = window.localStorage.getItem('token');
      const { data: tabDrinks } = await axios.put(
        '/api/user/tab/current',
        null,
        {
          headers: { authorization: token },
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <CardSection />
      <Button disabled={!stripe}>Create Tab</Button>
      <p>you won't be charged until your tab is closed</p>
    </Form>
  );
}

// can also add: "I authorize bashify to send instructions to the financial institution that issued my card to take payments from my card account in accordance with the terms of my agreement with you.""
