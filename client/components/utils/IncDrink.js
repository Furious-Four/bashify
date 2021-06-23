import axios from 'axios';

export const incDrink = async (id) => {
  try {
    //check if user token exists, if not, redirect to login/register page. otherwise continue:
    //check if active tab already exists. if not, create new tab and new order and add on drink. if so, add onto existing order
    if (window.localStorage.token) {
      const tokenObj = window.localStorage.token;
      const { data: activeOrder } = await axios.get('/api/user/order/current', {
        headers: { authorization: tokenObj },
      });
      ///if (activeOrder) {
      //loop through orderDrinks and see if there is already a drink with id in there. if there is, increment that quantity by 1. otherwise, create a new orderDrink row.
      const orderExists = activeOrder.orderDrinks.filter(
        (orderDrink) => orderDrink.drinkId === id
      );
      if (orderExists.length > 0) {
        const orderExistsQuantity = orderExists[0].quantity;
        const {data: updateDrinkOnOrder} = await axios.put(
          '/api/user/order/current/modify-drink',
          { drinkId: id, quantity: orderExistsQuantity + 1 },
          {
            headers: { authorization: tokenObj },
          }
        );
        return updateDrinkOnOrder
      } else {
        const {data: newDrinkOnOrder} = await axios.put(
          '/api/user/order/current/modify-drink',
          { drinkId: id, quantity: 1 },
          {
            headers: { authorization: tokenObj },
          }
        );
        return newDrinkOnOrder
      }
    } else {
      alert('you need to login!');
    }
    // console.log(activeOrder);
  } catch (error) {
    console.error(error);
  }
};
