import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import Checkout from '../utils/Checkout'

import { CurrentOrderCard, CurrentOrderHeader, CurrentOrderPage, CurrentOrderForm, Button } from '../../styles/CurrentOrderStyles';

const CurrentOrder = () => {

  const [order, setOrder] = useState({})
  const [drinks, setDrinks] = useState([])
  const [loading, setLoading] = useState(true)
  const [subtotal, setSubTotal] = useState(0)

  useEffect(async() => {
    try {
        const token = window.localStorage.getItem('token')
        const {data: order} = await axios.get(`/api/user/order/current`, 
        { headers: { authorization: token } }
        )
        setOrder(order)
        setLoading(false)

        const {data} = await axios.get(`/api/user/order/${order.id}`, 
            { headers: { authorization: token } }
            )
            const drinks = data.orderDrinks 
            setDrinks(drinks)
      }
      catch (ex) {
        console.log(ex)
      } 
  }, [])

  useEffect(() => {
    if (drinks.length) {
        const prices = []
        drinks.map(drink => {
            prices.push(drink.price)
        })
        const subtotal = prices.reduce((acc, cum) => acc + cum)

        setSubTotal(subtotal)
    }
  })

  const increment = (id, subtotal) => {
    let newSubtotal; 
    const newDrinks = drinks.map((drink) => {
      if (drink.drink.id === id) {
        drink.quantity++
        newSubtotal  = subtotal + drink.drink.price
      }
      return drink
    })
    setDrinks(newDrinks)
    setSubTotal(newSubtotal)
  }

   const decrement = async(id, subtotal) => {
    let newSubtotal;
    const newDrinks = drinks.map((drink) => {
      if (drink.drink.id === id) {
        if (drink.quantity > 0) {
          drink.quantity--
          newSubtotal  = subtotal - drink.drink.price
        }
      }
      return drink
    }).filter(drink => drink.quantity !== 0)
    // update drink here with put route?
    setDrinks(newDrinks)
    setSubTotal(newSubtotal)
  }


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
                <div>
                    {
                        drinks.map((drink) => {
                            return (
                                <div className='formDiv' key={drink.drink.id}>
                                    <div key={drink.drink.name}>
                                        {drink.drink.name}
                                    </div>
                                    <div key={drink.drink.price}>
                                        ${drink.drink.price}
                                    </div>
                                    <Button onClick={() => decrement(drink.drink.id, subtotal)}>-</Button>
                                        {drink.quantity}
                                    <Button onClick={() => increment(drink.drink.id, subtotal)}>+</Button>
                                </div>
                            )
                        })
                    }
                </div>
            </CurrentOrderForm>
                <h3 id='subtotal'>subtotal ${subtotal}</h3>
        </CurrentOrderCard>
        <Checkout />
        {/* <Button>submit order</Button> */}
    </CurrentOrderPage>
  );
}

};

export default CurrentOrder;