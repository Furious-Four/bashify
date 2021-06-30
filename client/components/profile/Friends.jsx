/* eslint-disable no-unused-vars */
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
import { connectUserSocket } from '../utils/Socket';

const Friends = () => {
  const [friendList, setFriendList] = useState([]);
  const [requestList, setRequestList] = useState([]);
  const [sentList, setSentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState(null);
  const [requestConfig, setRequestConfig] = useState(null);
  const [requestForm, setRequestForm] = useState('');

  useEffect(async () => {
    if (loading) {
      try {
        if (!requestConfig) {
          const token = window.localStorage.getItem('token');
          const config = {
            headers: { authorization: token },
          };
          setRequestConfig(config);
        } else {
          const { data: friends } = await axios.get(
            '/api/user/friend/all',
            requestConfig
          );
          setFriendList(friends);
          const { data: requests } = await axios.get(
            '/api/user/friend/requests',
            requestConfig
          );
          setRequestList(requests);
          const { data: sentRequests } = await axios.get(
            '/api/user/friend/sent',
            requestConfig
          );
          setSentList(sentRequests);
          if (!socket) {
            const token = window.localStorage.getItem('token');
            const newSocket = connectUserSocket(token, 'test');
            setSocket(newSocket);
          }
          setLoading(false);
        }
      } catch (err) {
        window.alert(err);
      }
    }
  }, [loading, requestConfig]);

  useEffect(() => {
    if (socket) {
      const listener = (message) => {
        if (message === 'NEW_FRIEND' || message === 'ACCEPT_FRIEND') {
          setLoading(true);
        }
      };
      socket.on('friend', listener);
      return () => {
        socket.disconnect();
        setSocket(null);
      };
    }
  }, [socket]);

  const requestResponse = async (friendId, mode) => {
    try {
      const body = { friendId, mode };
      await axios.put('/api/user/friend/request', body, requestConfig);
      if (socket) socket.emit('friend', 'ACCEPT_FRIEND', friendId);
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
      if (socket) socket.emit('friend', 'NEW_FRIEND', requestForm);
      setLoading(true);
      setRequestForm('');
    } catch (err) {
      console.error(err);
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
            <h3>Requests received</h3>
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

      <FriendSection>
        {sentList.length ? (
          <>
            <h3>Sent requests</h3>
            {sentList.map((request) => {
              return (
                <RequestRow key={request.id}>
                  <div>{request.fullName}</div>
                </RequestRow>
              );
            })}
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
