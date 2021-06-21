import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import { AllDrinksPage, SingleDrink } from '../../styles/AllDrinks';
import { incDrink } from '../utils/IncDrink';

const AllDrinks = (props) => {
  const [drinks, setDrinks] = useState([]);

  const getAllDrinks = async (id) => {
    try {
      const { data: venue } = await axios.get(`/api/venue/${id}`);
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
      getAllDrinks(props.match.params.id);
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
            href={`/#/venue/${props.match.params.id}/drink/${drink.id}`}
            //change 1 to venueId
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
