/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { SplitRow, SplitTab } from '../../styles/Splits';

const SentRequests = ({ reqConfig }) => {
  const [loading, setLoading] = useState(true);
  const [sentRequests, setSentRequests] = useState([]);

  useEffect(async () => {
    if (loading) {
      try {
        const { data: requests } = await axios.get(
          '/api/user/split/outbound',
          reqConfig
        );
        setSentRequests(requests);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    }
  }, [loading]);

  if (sentRequests.length) {
    return (
      <SplitTab>
        {sentRequests.map((request) => {
          const {
            id,
            status,
            quantity,
            price,
            drink: { name },
            owner: { fullName },
          } = request;
          let displayStatus;
          if (status === 'REQUESTED-INCOMING') displayStatus = 'Pending';
          if (status === 'NO REQUEST') displayStatus = 'Accepted';
          else displayStatus = status[0] + status.slice(1).toLowerCase();
          return (
            <SplitRow key={id}>
              <div>{name}</div>
              <div>Status: {displayStatus}</div>
              <div>
                {quantity} x ${price} = ${quantity * price}
              </div>
              <div>Requested from {fullName}</div>
            </SplitRow>
          );
        })}
      </SplitTab>
    );
  } else {
    return (
      <SplitTab>
        <div>You have not sent any split requests</div>
      </SplitTab>
    );
  }
};

export default SentRequests;
