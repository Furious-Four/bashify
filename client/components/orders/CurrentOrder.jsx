import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';

import { CurrentOrderCard, CurrentOrderHeader, CurrentOrderPage, CurrentOrderForm, Button } from '../../styles/CurrentOrderStyles';

const CurrentOrder = () => {

  const [order, setOrder] = useState({})
  const [drinks, setDrinks] = useState({})
  const [loading, setLoading] = useState(true)

  const getOrder = async() => {
      try {
        const token = window.localStorage.getItem('token')
        const {data: order} = await axios.get(`/api/user/order/current`, 
        { headers: { authorization: token } }
        )
        return order
      }
      catch (ex) {
        console.log(ex)
      } 
  }

  useEffect(()=> {
    getOrder()
    .then((order) => {
        setOrder(order)
        setLoading(false)
    })
  }, [])

  const getOrderDrinks = async() => {
    try {
        if (!loading) {
            const token = window.localStorage.getItem('token')
            const {data: drinks} = await axios.get(`/api/user/order/${order.id}`, 
            { headers: { authorization: token } }
            )
            //const drinks = data.orderDrinks
            return drinks
        }
    }
    catch (ex) {
      console.log(ex)
    } 
}

  useEffect(()=> {
    getOrderDrinks()
    .then((drinks) => {
        setDrinks(drinks)
        console.log(drinks)
        //setLoading(false)
    })
  }, [])

  if (loading) {
    return (
        <div>
            ...loading
        </div>
    )
  } else {

  return (
    <CurrentOrderPage>
        <CurrentOrderHeader>
            <h2>your current order</h2> 
        </CurrentOrderHeader>
        <CurrentOrderCard>
            <h3>Status: {order.status}</h3>
            <CurrentOrderForm>
                <ul>
                    {/* {
                        drinks.orderDrinks.map(element => {
                            return (
                                <li>
                                    {element.drink.name}
                                    {element.drink.price}
                                </li>
                            )
                        })
                    } */}
                </ul>
            </CurrentOrderForm>
            <h3 id='subtotal'>subtotal</h3>
        </CurrentOrderCard>
        <Button>submit order</Button>
    </CurrentOrderPage>
  );
}

};

export default CurrentOrder;