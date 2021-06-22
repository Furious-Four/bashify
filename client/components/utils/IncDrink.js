import axios from 'axios';

export const incDrink = async (id) => {
  try {
    //check if user token exists, if not, redirect to login/register page. otherwise continue:
    //check if active tab already exists. if not, create new tab and new order and add on drink. if so, add onto existing order
    if (window.localStorage.token) {
      const { data: activeOrder } = await axios.get('/api/user/order/current', {
        headers: { authorization: window.localStorage.token },
      });
      if (activeOrder) {
        //create a new orderDrink row
      } else {
        //create a new order row
        //create a new orderDrink row
      }
      console.log(activeOrder);
    } else {
      alert('you need to login!');
    }
  } catch (error) {
    console.error(error);
  }
};
