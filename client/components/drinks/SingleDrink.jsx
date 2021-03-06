import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import { SingleDrinkPage, SingleDrinkView } from '../../styles/SingleDrink';
import { Button } from '../../styles/GlobalStyle';
import { incDrink } from '../utils/IncDrink';

const SingleDrink = (props) => {
  const [drink, setDrink] = useState([]);

  const getSingleDrink = async (venueId, drinkId) => {
    try {
      const { data: venue } = await axios.get(`/api/venue/${venueId}`);
      const activeMenu = venue[0].menus.filter(
        (menu) => menu.status === 'ACTIVE'
      );
      const activeDrinks = activeMenu[0].drinks;
      const activeDrink = activeDrinks.filter((drink) => drink.id === drinkId);
      setDrink(activeDrink);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (Object.keys(drink).length === 0) {
      getSingleDrink(props.match.params.id, props.match.params.drinkid);
    }
  });

  return (
    <SingleDrinkPage
      transition={{ ease: 'easeOut', duration: 1 }}
      initial={{ opacity: 0 }}
      animate={{ x: [100, 0], opacity: 1 }}
    >
      {drink.map((drink) => {
        return (
          <SingleDrinkView key={drink.id}>
            <img src={drink.image} /> <hr />
            <h3 style={{ fontWeight: 200 }}>
              {drink.name} <br />$ {drink.price}
            </h3>
            {drink.amount} mL
            <br />
            <Button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                if (window.localStorage.token) {
                  incDrink(drink.id);
                  alert(`One ${drink.name} added to your order!`);
                } else {
                  props.history.push('/login');
                }
              }}
            >
              add to order
            </Button>
          </SingleDrinkView>
        );
      })}
    </SingleDrinkPage>
  );
};

export default SingleDrink;
