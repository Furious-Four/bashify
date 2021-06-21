import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CurrentTab = () => {
  const [tab, setTab] = useState({});
  const [drinks, setDrinks] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
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
  //   useEffect(() => {
  //     if (this.tip) {
  //       const drinks = [];
  //       drinks.map((drink) => {
  //         prices.push(drink.drink.price);
  //       });

  //       const drinkTotal = prices.reduce((acc, cum) => acc + cum);
  //       const total = this.tax * drinkTotal + this.tip * drinkTotal + drinkTotal;
  //       setTotal(total);
  //     }
  //   });

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
      <h5> Tip </h5> <button> 20% </button> <button> 15% </button>{' '}
      <button> 25% </button>
      <h3> Subtotal ${subtotal} </h3>
      <hr />
      <h2> Total ${total} </h2>
    </div>
  );
};

export default CurrentTab;
