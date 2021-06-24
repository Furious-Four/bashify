import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import { AllDrinksPage, SingleDrink, Image } from '../../styles/AllDrinks';
import { Button } from "../../styles/GlobalStyle";
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
            href={`/#/venue/${props.match.params.id}/drink/${drink.id}`}
            //change 1 to venueId
          >
            <Image src={drink.image} /> <hr />
            <h3 style={{fontWeight:200}}>{drink.name} <br />$ {drink.price}</h3>
            {drink.amount} mL
            <br />
            <Button whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }} onClick={() => incDrink(drink.id)}>Add to Order</Button>
          </SingleDrink>
        );
      })}
    </AllDrinksPage>
  );
};

export default AllDrinks;
