import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { Button } from '../../styles/GlobalStyle';
import {
  FriendSection,
  FriendTab,
  RequestRow,
  FriendRequest,
  FriendRequestForm,
} from '../../styles/Profile';

const Friends = () => {
  const [friendList, setFriendList] = useState([]);
  const [requestList, setRequestList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [requestConfig, setRequestConfig] = useState(null);
  const [requestForm, setRequestForm] = useState('');

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
      await axios.put('/api/user/friend/request', body, requestConfig);
      setLoading(true);
    } catch (err) {
      window.alert('Failed to respond to request');
    }
  };

  const changeForm = ({ target: { value } }) => {
    setRequestForm(value);
  };

  const requestSubmit = async () => {
    try {
      await axios.post(
        '/api/user/friend/request',
        { username: requestForm },
        requestConfig
      );
      // Something visual to let the user know the request was successful
      setLoading(true);
      setRequestForm('');
    } catch (err) {
      window.alert('Failed to create request');
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
        {requestList.length ? (
          <>
            <h3>Requests</h3>
            {requestList.map((friend) => (
              <RequestRow key={friend.id}>
                <div>{friend.fullName}</div>
                <div>
                  <Button onClick={() => requestResponse(friend.id, 'ACCEPT')}>
                    <img src="/public/check.svg" width="15em" />
                  </Button>
                  <Button onClick={() => requestResponse(friend.id, 'REJECT')}>
                    <img src="/public/exit.svg" width="15em" />
                  </Button>
                </div>
              </RequestRow>
            ))}
          </>
        ) : (
          ''
        )}
      </FriendSection>

      <FriendRequest>
        <h3>Add a Friend</h3>
        <FriendRequestForm>
          <input
            type="text"
            name="username"
            value={requestForm}
            placeholder="username"
            onChange={changeForm}
          />
          <Button onClick={requestSubmit}>Request</Button>
        </FriendRequestForm>
      </FriendRequest>
    </FriendTab>
  );
};

export default Friends;
