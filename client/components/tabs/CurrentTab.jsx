/* eslint-disable no-unused-vars */
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
  const [friends, setFriends] = useState([]);

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
      const { data: friends } = await axios.get(`api/user/friend/all`, {
        headers: { authorization: token },
      });
      setFriends(friends);
      setLoading(false);
      const drinks = tab.tabDrinks;
      setDrinks(drinks);
    } catch (ex) {
      console.log(ex);
    }
  }, []);
  const tip = 0;

  useEffect(() => {
    if (drinks) {
      const prices = [];
      drinks.map((drink) => {
        prices.push(drink.drink.price * drink.quantity);
      });
      const subtotal = prices.reduce((acc, cum) => acc + cum, 0);

      setSubtotal(subtotal);
    }
  });

  const handleClick = function (value) {
    let tip = value;
    let total = tab.tax * subtotal + tip * subtotal + subtotal;
    total = total.toFixed(2);
    // currently total is 0 until we add tip?
    setTotal(total);
  };

  const requestSplit = async (tabDrinkId) => {
    const token = window.localStorage.getItem('token');
    const { data: updatedDrink } = await axios.put(
      '/api/user/tab/current/request-split',
      { tabDrinkId, requestUserId: 2 },
      { headers: { authorization: token } }
    );
    setLoading(true);
  };

  const chargeCard = async(total) => {
    try {
      const amount = parseInt(total * 100)
      const token = window.localStorage.getItem('token');
      const data = await axios.post('/api/checkout/charge-card',
      {amount}, 
      { headers: { authorization: token } }
      );
    } catch (ex) {
      console.log(ex);
    }
    return alert('thanks! your tab is now closed');
  };

  if (drinks) {
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
                  <div className="formDiv" key={drink.drink.id}>
                    <div> {drink.drink.name} </div>
                    <div>{drink.quantity}</div>
                    <div> x </div>
                    <div> ${drink.drink.price} </div>

                    <input type="button" value={value} onClick={togglePopup} />
                    {isOpen && (
                      <PopUp
                        content={
                          <>
                            <b>enter username:</b>
                            <select id="reqUsername">
                              {friends.map((friend) => {
                                return (
                                  <option value={friend.username}>
                                    {friend.fullName}
                                  </option>
                                );
                              })}
                            </select>
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
