import styled from 'styled-components';

export const Form = styled.form`
  .StripeElement {
    height: 15px;
    padding: 10px 12px;
    margin: .5rem;
    width: calc(100% - 2rem);
    color: #32325d;
    background-color: white;
    border: 1px solid transparent;
    border-radius: 4px;
    box-shadow: 0 1px 3px 0 #e6ebf1;
    -webkit-transition: box-shadow 150ms ease;
    transition: box-shadow 150ms ease;
  }
  .StripeElement--focus {
    box-shadow: 0 1px 3px 0 #cfd7df;
  }
  .StripeElement--invalid {
    border-color: #fa755a;
  }
  .StripeElement--webkit-autofill {
    background-color: #fefde5 !important;
  }

  button {
    color: var(--blue);
    text-align: center;
    transition: all 0.15s;
    background: var(--orange);
    height: 25%;
  }


`;
