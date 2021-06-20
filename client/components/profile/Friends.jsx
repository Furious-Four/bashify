import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { Button } from '../../styles/GlobalStyle';
import { FriendSection, FriendTab } from '../../styles/Profile';

const Friends = () => {
  const [friendList, setFriendList] = useState([]);
  const [requestList, setRequestList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [requestConfig, setRequestConfig] = useState(null);

  useEffect(async () => {
    if (loading) {
      try {
        const token = window.localStorage.getItem('token');
        if (token) {
          const config = {
            headers: { authorization: token },
          };
          const { data: friends } = await axios.get(
            '/api/user/friend/all',
            config
          );
          setFriendList(friends);
          const { data: requests } = await axios.get(
            '/api/user/friend/requests',
            config
          );
          setRequestList(requests);
          setRequestConfig(config);
        }
        setLoading(false);
      } catch (err) {
        window.alert(err);
      }
    }
  }, [loading]);

  const requestResponse = async (friendId, mode) => {
    try {
      const body = { friendId, mode };
      console.log(body);
      await axios.put('/api/user/friend/request', body, requestConfig);
      setLoading(true);
    } catch (err) {
      window.alert('Failed to accept request');
    }
  };

  return (
    <FriendTab>
      <FriendSection>
        <h3>Friends</h3>
        {friendList.map((friend) => (
          <div key={friend.id}>{friend.fullName}</div>
        ))}
      </FriendSection>

      <FriendSection>
        <h3>Requests</h3>
        {requestList.map((friend) => (
          <div key={friend.id}>
            <div>{friend.fullName}</div>
            <Button onClick={() => requestResponse(friend.id, 'ACCEPT')}>
              Accept
            </Button>
            <Button onClick={() => requestResponse(friend.id, 'REJECT')}>
              Reject
            </Button>
          </div>
        ))}
      </FriendSection>
    </FriendTab>
  );
};

export default Friends;
