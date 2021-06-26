/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Checkout from '../utils/Checkout';
import { decDrink } from '../utils/DecDrink';
import { incDrink } from '../utils/IncDrink';
import PopUp from '../tabs/PopUp.jsx';
import { Button } from '../../styles/GlobalStyle';
import {
  CurrentOrderCard,
  CurrentOrderHeader,
  CurrentOrderPage,
  CurrentOrderForm,
} from '../../styles/CurrentOrderStyles';

const CurrentOrder = () => {
  const history = useHistory();
  const [order, setOrder] = useState({});
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subtotal, setSubTotal] = useState();
  const [isOpen, setIsOpen] = useState(false);

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

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };



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
        <div>
          <input type="button" value="submit order" onClick={togglePopup} />
            {isOpen && (
              <PopUp
                content={
                <div>
                  <Checkout />
                  {/* <Button
                  onClick={async () => {
                    await createTabDrinks();
                    history.push('/tab');
                  }}
                  >
                  Go to tab
                </Button> */}
                </div>
                }
                handleClose={togglePopup}
            />)}
        </div>        
      </CurrentOrderPage>
    );
  }
};

export default CurrentOrder;
