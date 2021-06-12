import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';

import { CurrentOrderCard, CurrentOrderHeader, CurrentOrderPage, CurrentOrderForm, Button } from '../../styles/CurrentOrderStyles';

const CurrentOrder = () => {

  return (
    <CurrentOrderPage>
        <CurrentOrderHeader>
            <h2>your current order</h2> 
        </CurrentOrderHeader>
        <CurrentOrderCard>
            <h3>Status: Ready to Order</h3>
            <CurrentOrderForm>
                <ul>
                  <li>Mojito - $15.92 <Button>x</Button></li>
                  <li>Moscow Mule - $16.00 <Button>x</Button></li>  
                </ul>
            </CurrentOrderForm>
            <h3 id='subtotal'>subtotal $56.98</h3>
        </CurrentOrderCard>
        <Button>submit order</Button>
    </CurrentOrderPage>
  );
};

export default CurrentOrder;
