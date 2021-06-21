import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import { SingleDrinkPage, SingleDrinkView } from '../../styles/SingleDrink';
import { incDrink } from '../utils/IncDrink';

const SingleDrink = (props) => {
  const [drink, setDrink] = useState([]);

  const getSingleDrink = async (venueId, drinkId) => {
    console.log(props);
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
    <SingleDrinkPage animate={{ scale: [0, 1] }}>
      {drink.map((drink) => {
        return (
          <SingleDrinkView
            key={drink.id}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <img src={drink.image} /> <hr />
            {drink.name} <br />$ {drink.price} | {drink.amount} mL
            <br />
            <button onClick={() => incDrink(drink.id)}>Add to Order</button>
          </SingleDrinkView>
        );
      })}
    </SingleDrinkPage>
  );
};

export default SingleDrink;
