import axios from 'axios';

export const decDrink = async (id) => {
  try {
    if (window.localStorage.token) {
      const tokenObj = window.localStorage.token;
      const { data: activeOrder } = await axios.get('/api/user/order/current', {
        headers: { authorization: tokenObj },
      });
      const orderExists = activeOrder.orderDrinks.filter(
        (orderDrink) => orderDrink.drinkId === id
      );
      if (orderExists.length > 0) {
        const orderExistsQuantity = orderExists[0].quantity;
        const updateDrinkOnOrder = await axios.put(
          '/api/user/order/current/modify-drink',
          { drinkId: id, quantity: orderExistsQuantity - 1 },
          {
            headers: { authorization: tokenObj },
          }
        );
      }
    } else {
      alert('you need to login!');
    }
    console.log(activeOrder);
  } catch (error) {
    console.error(error);
  }
};
