import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CurrentTabHeader,
  CurrentTabCard,
  CurrentTabPage,
  CurrentTabForm,
  Button,
  Tip,
} from '../../styles/Tab';

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
    <CurrentTabPage>
      <CurrentTabHeader>
        <h1> your current tab </h1>
      </CurrentTabHeader>
      <CurrentTabCard>
        <CurrentTabForm>
          <div>
            {drinks.map((drink) => {
              return (
                <div className="formDiv">
                  <div key={drink.drink.id}> {drink.drink.name} </div>
                  <div key={drink.drink.name}> ${drink.drink.price} </div>
                  <div key={drink.drink.tabId}>{drink.drink.amount}ml </div>
                </div>
              );
            })}
          </div>
        </CurrentTabForm>
        <h5> select tip amount </h5>
        <Tip>
          <Button value={0.2} onClick={(e) => handleClick(e.target.value)}>
            20%
          </Button>
          <Button value={0.15} onClick={(e) => handleClick(e.target.value)}>
            15%
          </Button>
          <Button value={0.25} onClick={(e) => handleClick(e.target.value)}>
            25%
          </Button>
        </Tip>
        <h3> subtotal ${subtotal} </h3>
        <h2> total ${total} </h2> <Button> checkout and close tab </Button>
      </CurrentTabCard>
    </CurrentTabPage>
  );
};

export default CurrentTab;
