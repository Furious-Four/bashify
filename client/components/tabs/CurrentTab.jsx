import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CurrentTab = () => {
  const [tab, setTab] = useState({});
  const [drinks, setDrinks] = useState([]);
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

  return (
    <div>
      <h1> Current Tab </h1>

      <h5>Drinks</h5>
      <hr />
      <h3> SubTotal </h3>
      <div>
        {drinks.map((drink) => {
          return (
            <div>
              <div key={drink.drink.id}> {drink.drink.name} </div>
              <div key={drink.drink.name}>{drink.drink.price} </div>
              <div key={drink.drink.tabId}>{drink.drink.amount} </div>
            </div>
          );
        })}
      </div>
      <h5> Tip {tab.tip} </h5>
      <h2> Total </h2>
    </div>
  );
};

export default CurrentTab;
