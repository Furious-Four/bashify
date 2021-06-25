/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import Checkout from '../utils/Checkout';
import { decDrink } from '../utils/DecDrink';
import { incDrink } from '../utils/IncDrink';

import {
  CurrentOrderCard,
  CurrentOrderHeader,
  CurrentOrderPage,
  CurrentOrderForm,
  Button,
} from '../../styles/CurrentOrderStyles';

const CurrentOrder = () => {
  const [order, setOrder] = useState({});
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subtotal, setSubTotal] = useState();

  useEffect(async () => {
    if (loading) {
      try {
        const token = window.localStorage.getItem('token');
        const { data: order } = await axios.get(`/api/user/order/current`, {
          headers: { authorization: token },
        });
        setOrder(order);
        setDrinks(order.orderDrinks);
        setLoading(false);
      } catch (ex) {
        console.log(ex);
      }
    }
  }, [loading]);

  useEffect(() => {
    if (order.orderDrinks) {
      setDrinks(order.orderDrinks);
    }
  }, [order]);

  const createTabDrinks = async () => {
    const token = window.localStorage.getItem('token');
    const { data: tabDrinks } = await axios.put('/api/user/tab/current', null, {
      headers: { authorization: token },
    });
  };

  useEffect(() => {
    //console.log(drinks)
    if (drinks.length) {
      const prices = [];
      drinks.map((drink) => {
        prices.push(drink.price * drink.quantity);
      });
      const subtotal = prices.reduce((acc, cum) => acc + cum);
      //console.log(subtotal)
      setSubTotal(subtotal);
    }
    // subtotal not updating if i delete all drinks
  }, [drinks]);

  if (loading) {
    return <div>...loading</div>;
  } else {
    return (
      <CurrentOrderPage>
        <CurrentOrderHeader>
          <h2>your current order</h2>
        </CurrentOrderHeader>
        <CurrentOrderCard>
          <h3>Status: {order.status}</h3>
          <CurrentOrderForm>
            <div>
              {drinks.map((drink) => {
                return (
                  <div className="formDiv" key={drink.drinkId}>
                    <div key={drink.drink.name}>{drink.drink.name}</div>
                    <div key={drink.drink.price}>${drink.drink.price}</div>
                    <Button
                      onClick={async () =>
                        setOrder(await decDrink(drink.drinkId))
                      }
                    >
                      -
                    </Button>
                    {drink.quantity}
                    <Button
                      onClick={async () =>
                        setOrder(await incDrink(drink.drinkId))
                      }
                    >
                      +
                    </Button>
                  </div>
                );
              })}
            </div>
          </CurrentOrderForm>
          <h3 id="subtotal">subtotal ${subtotal}</h3>
        </CurrentOrderCard>
        <Button onClick={createTabDrinks}>
          <Link to="tab">Submit Order</Link>
        </Button>
        <Checkout />
      </CurrentOrderPage>
    );
  }
};

export default CurrentOrder;
