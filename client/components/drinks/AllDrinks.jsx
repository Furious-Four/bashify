import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import { AllDrinksPage, SingleDrink } from '../../styles/AllDrinks';

const AllDrinks = () => {
  const [drinks, setDrinks] = useState([]);

  const getAllDrinks = async (venueId) => {
    try {
      const { data: venue } = await axios.get(`/api/venue/${venueId}`);
      const activeMenu = venue[0].menus.filter(
        (menu) => menu.status === 'ACTIVE'
      );
      const activeDrinks = activeMenu[0].drinks;
      setDrinks(activeDrinks);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (drinks.length === 0) {
      getAllDrinks(1);
    }
  });

  incDrink = async (id) => {
    try {
      //check if user token exists, if not, redirect to login/register page. otherwise continue:
      //check if active tab already exists. if not, create new tab and new order and add on drink. if so, add onto existing order
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AllDrinksPage animate={{ scale: [0, 1] }}>
      {drinks.map((drink) => {
        return (
          <SingleDrink
            key={drink.id}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <img src={drink.image} /> <hr />
            {drink.name} <br />$ {drink.price} | {drink.amount} mL
            <br />
            <button onClick={() => incDrink(drink.id)}>Add to Order</button>
          </SingleDrink>
        );
      })}
    </AllDrinksPage>
  );
};

export default AllDrinks;
