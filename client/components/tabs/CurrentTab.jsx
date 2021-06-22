import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CurrentTab = () => {
  const [tab, setTab] = useState({});
  const [drinks, setDrinks] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  let [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    try {
      const token = window.localStorage.getItem('token');
      const { data: tab } = await axios.get(`/api/user/tab/current`, {
        headers: { authorization: token },
      });
      setTab(tab);
      setLoading(false);
      const drinks = tab.tabDrinks;
      setDrinks(drinks);
      console.log('tab is', tab);
      console.log('drinks is ', drinks);
    } catch (ex) {
      console.log(ex);
    }
  }, []);
  const tip = 0;

  useEffect(() => {
    if (drinks.length) {
      const prices = [];
      drinks.map((drink) => {
        prices.push(drink.drink.price);
      });
      const subtotal = prices.reduce((acc, cum) => acc + cum);

      setSubtotal(subtotal);
    }
  });
  const handleClick = function (value) {
    let tip = value;
    let total = tab.tax * subtotal + tip * subtotal + subtotal;
    total = total.toFixed(2);
    setTotal(total);
  };

  return (
    <div>
      <h1> Current Tab </h1>
      <div>
        {drinks.map((drink) => {
          return (
            <div>
              <div key={drink.drink.id}> {drink.drink.name} </div>
              <div key={drink.drink.name}> ${drink.drink.price} </div>
              <div key={drink.drink.tabId}>{drink.drink.amount} </div>
            </div>
          );
        })}
      </div>
      <h5> Select tip amount </h5>{' '}
      <button value={0.2} onClick={(e) => handleClick(e.target.value)}>
        {' '}
        20%{' '}
      </button>
      <button> 15% </button> <button> 25% </button>
      <h3> Subtotal ${subtotal} </h3>
      <hr />
      <h2> Total ${total} </h2> <button> Checkout and Close Tab </button>
    </div>
  );
};

export default CurrentTab;

{
  /* <SingleDrinkView
key={drink.id}
whileHover={{ scale: 1.1 }}
whileTap={{ scale: 0.9 }}
>
<img src={drink.image} /> <hr />
{drink.name} <br />$ {drink.price} | {drink.amount} mL
<br />
<button onClick={() => incDrink(drink.id)}>Add to Order</button>
</SingleDrinkView> */
}
