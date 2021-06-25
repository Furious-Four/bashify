import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PopUp from './PopUp';
import {
  CurrentTabHeader,
  CurrentTabCard,
  CurrentTabPage,
  CurrentTabForm,
  Tip,
  Button,
} from '../../styles/Tab';

const CurrentTab = () => {
  const [tab, setTab] = useState({});
  const [drinks, setDrinks] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  let [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

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
      //console.log('tab is', tab);
      //console.log('drinks is ', drinks);
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
  //   const requestSplit = () => {
  //     console.log('request sent to user');
  //     console.log(userInput);
  //   };

  const handleClick = function (value) {
    let tip = value;
    let total = tab.tax * subtotal + tip * subtotal + subtotal;
    total = total.toFixed(2);
    setTotal(total);
  };
  //   let userInput;

  const requestSplit = async (tabDrinkId) => {
    const token = window.localStorage.getItem('token');
    const { data: updatedDrink } = await axios.put(
      '/api/user/tab/current/request-split',
      { tabDrinkId, requestUserId: 2 },
      { headers: { authorization: token } }
    );
    setLoading(true);
    // const inputElement = document.getElementById('reqUsername');
    // inputElement.addEventListener('change', function (e) {
    //   userInput = e.target.value;
    //   console.log(e.target.value);
    // });
    // return userInput;
  };

  const chargeCard = async(total) => {
    try {
      console.log(total)
      const token = window.localStorage.getItem('token');
      const data = await axios.post('/api/checkout/charge-card',
      null, 
      // check this for the jwt error
      { headers: { authorization: token } }
      );
    } catch (ex) {
      console.log(ex);
    }
    return alert('thanks! your tab is now closed');
  };

  if (drinks.length) {
    return (
      <CurrentTabPage>
        <CurrentTabHeader>
          <h1> your current tab </h1>
        </CurrentTabHeader>
        <CurrentTabCard>
          <CurrentTabForm>
            <div>
              {drinks.map((drink) => {
                let value =
                  drink.status === 'REQUESTED-OUTBOUND'
                    ? 'request pending'
                    : 'split drink';
                return (
                  <div className="formDiv">
                    <div key={drink.drink.id}> {drink.drink.name} </div>
                    <div key={drink.drink.name}> ${drink.drink.price} </div>
                    <div key={drink.drink.tabId}>{drink.drink.amount}ml </div>
                    <input type="button" value={value} onClick={togglePopup} />
                    {isOpen && (
                      <PopUp
                        content={
                          <>
                            <b>enter username:</b>
                            <input type="text" id="reqUsername" />
                            <input
                              type="button"
                              value="send request"
                              onClick={() => requestSplit(drink.id)}
                            />
                          </>
                        }
                        handleClose={togglePopup}
                      />
                    )}
                  </div>
                );
              })}
            </div>
            <div></div>
          </CurrentTabForm>
          <h5> select tip amount </h5>
          <Tip>
            <Button value={0.15} onClick={(e) => handleClick(e.target.value)}>
              15%
            </Button>
            <Button value={0.2} onClick={(e) => handleClick(e.target.value)}>
              20%
            </Button>
            <Button value={0.25} onClick={(e) => handleClick(e.target.value)}>
              25%
            </Button>
          </Tip>
          <h3> subtotal ${subtotal} </h3>
          <h2> total ${total} </h2>
          <Button onClick={async () => await chargeCard(total)}>
            checkout and close tab
          </Button>
        </CurrentTabCard>
      </CurrentTabPage>
    );
  } else {
    return (
      <CurrentTabPage>
        <CurrentTabHeader>
          <h1> your current tab </h1>
        </CurrentTabHeader>
        <CurrentTabCard>
          <CurrentTabForm>your tab is currently empty</CurrentTabForm>
        </CurrentTabCard>
        <Link to="/"> order drinks </Link>
      </CurrentTabPage>
    );
  }
};

export default CurrentTab;
