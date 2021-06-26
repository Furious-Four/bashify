/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import PopUp from './PopUp';
import {
  CurrentTabHeader,
  CurrentTabCard,
  CurrentTabPage,
  CurrentTabForm,
  TabRow,
  Tip,
} from '../../styles/Tab';

import { Button } from '../../styles/GlobalStyle';

const CurrentTab = () => {
  const history = useHistory();
  const [tab, setTab] = useState({});
  const [drinks, setDrinks] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [tip, setTip] = useState(0.15);
  let [total, setTotal] = useState(subtotal);
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
  }, [isOpen]);

  useEffect(() => {
    if (drinks) {
      const prices = [];
      drinks.map((drink) => {
        if (drink.status !== 'ACCEPTED') {
          prices.push(drink.drink.price * drink.quantity);
        }
      });
      const subtotal = prices.reduce((acc, cum) => acc + cum, 0);

      setSubtotal(subtotal);
      setTotal(subtotal + subtotal * tip);
    }
  });

  const handleClick = function (value) {
    setTip(value);
    // let total = tab.tax * subtotal + tip * subtotal + subtotal;
    // total = total.toFixed(2);
    // // currently total is 0 until we add tip?
    // setTotal(total);
  };

  const requestSplit = async (tabDrinkId, requestUserId) => {
    const token = window.localStorage.getItem('token');
    const { data: updatedDrink } = await axios.put(
      '/api/user/tab/current/request-split',
      { tabDrinkId, requestUserId },
      { headers: { authorization: token } }
    );
    setLoading(true);
  };

  const chargeCard = async (total) => {
    try {
      const amount = parseInt(total * 100);
      const token = window.localStorage.getItem('token');
      const data = await axios.post(
        '/api/checkout/charge-card',
        { amount },
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
            {drinks.map((drink) => {
              let value;
              if (drink.status === 'ACCEPTED') {
                value = 'split accepted';
              } else {
                value =
                  drink.status === 'REQUESTED-OUTBOUND'
                    ? 'request pending'
                    : 'split drink';
              }
              const buttonOpt =
                drink.status === 'ACCEPTED' ||
                drink.status === 'REQUESTED-OUTBOUND';
              return (
                <TabRow key={drink.drink.id}>
                  <div> {drink.drink.name} </div>
                  <div>
                    <div>{drink.quantity}</div>
                    <div> x </div>
                    <div> ${drink.drink.price} </div>
                    <Button
                      disabled={buttonOpt}
                      secondary={buttonOpt}
                      onClick={togglePopup}
                    >
                      {value}
                    </Button>
                    {isOpen && (
                      <PopUp
                        content={
                          friends.length ? (
                            <>
                              <b>select a friend to request:</b>
                              <select id="reqUsername">
                                {friends.map((friend) => {
                                  return (
                                    <option key={friend.id} value={friend.id}>
                                      {friend.fullName}
                                    </option>
                                  );
                                })}
                              </select>
                              <Button
                                onClick={(ev) => {
                                  const requestUserId = ev.target.parentNode.querySelector(
                                    'select'
                                  ).value;
                                  requestSplit(drink.id, requestUserId);
                                  togglePopup();
                                }}
                              >
                                Request
                              </Button>
                            </>
                          ) : (
                            <>
                              <b>
                                to send a request, you need at least one friend
                              </b>
                              <Button
                                onClick={() =>
                                  history.push('/profile?tab=friends')
                                }
                              >
                                Add Friends
                              </Button>
                            </>
                          )
                        }
                        handleClose={togglePopup}
                      />
                    )}
                  </div>
                </TabRow>
              );
            })}
          </CurrentTabForm>
          <Tip>
            <h5>select tip amount: </h5>
            <Button
              disabled={tip == 0.15}
              secondary={tip == 0.15}
              value={0.15}
              onClick={(e) => handleClick(e.target.value)}
            >
              15%
            </Button>
            <Button
              disabled={tip == 0.2}
              secondary={tip == 0.2}
              value={0.2}
              onClick={(e) => handleClick(e.target.value)}
            >
              20%
            </Button>
            <Button
              disabled={tip == 0.25}
              secondary={tip == 0.25}
              value={0.25}
              onClick={(e) => handleClick(e.target.value)}
            >
              25%
            </Button>
          </Tip>
          <Tip>
            <h3>subtotal:</h3>
            <h3>${subtotal}</h3>
          </Tip>
          <Tip>
            <h2>total:</h2>
            <h2>${total}</h2>
          </Tip>
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
