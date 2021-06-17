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
      console.log(activeDrinks);
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

  return (
    <AllDrinksPage animate={{ scale: [0, 1] }}>
      {drinks.map((drink) => {
        return (
          <SingleDrink
            key={drink.id}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {drink.name}
          </SingleDrink>
        );
      })}
    </AllDrinksPage>
  );
};

export default AllDrinks;
