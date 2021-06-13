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
                <table>
                    <tr>
                        <td>Mojito</td>
                        <td>$15.92</td>
                        <td></td>
                        <Button>-</Button>
                        <td>1</td>
                        <Button>+</Button>
                    </tr>
                    <tr>
                        <td>Moscow Mule</td>
                        <td>$16.92</td>
                        <td></td>
                        <Button>-</Button>
                        <td>1</td>
                        <Button>+</Button>
                    </tr>
                </table>
            </CurrentOrderForm>
            <h3 id='subtotal'>subtotal $56.98</h3>
        </CurrentOrderCard>
        <Button>submit order</Button>
    </CurrentOrderPage>
  );
};

export default CurrentOrder;
