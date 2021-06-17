import React, { useState, useEffect } from 'react';
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import axios from 'axios';

import MainNav from './MainNav.jsx';
import Login from './authentication/Login.jsx';
import Register from './authentication/Register.jsx';
import SocketTest from './SocketTest.jsx';
import { connectUserSocket } from './utils/Socket.js';

const App = () => {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  const fetchUserDetails = async (token) => {
    try {
      const { data: user } = await axios.get('/api/user', {
        headers: { authorization: token },
      });
      setUser(user);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(async () => {
    // Like componentDidMount and componentDidUpdate all in one
    if (!token) {
      const localToken = window.localStorage.getItem('token');
      console.log(localToken);
      if (localToken) {
        setToken(localToken);
        setLoggedIn(true);
      }
    }
    if (!user.id && loggedIn) {
      try {
        await fetchUserDetails(token);
        connectUserSocket(token, 'test');
      } catch (err) {
        console.error(err);
        window.localStorage.removeItem('token');
        setToken(null);
        setLoggedIn(false);
      }
    }
    if (user.id && !loggedIn) {
      setUser({});
    }
  }, [loggedIn, token]);

  return (
    <Router>
      <MainNav user={user} setLoggedIn={setLoggedIn} />
      <Switch>
        <Route path="/login">
          {loggedIn ? <Redirect to="/" /> : <Login setLoggedIn={setLoggedIn} />}
        </Route>
        <Route path="/register">
          {loggedIn ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/socketTest" component={SocketTest} />
        {/*
        AllDrinks
        SingleDrink
        Profile
        CurrentTab
        CurrentOrder
        VenueLandingPage
      */}
      </Switch>
    </Router>
  );
};

// const App = () => {
//   const [venue, setVenue] = useState();
//   const fetchVenueDetails = async (id) => {
//     const response = await axios.get(`/api/venue/${id}`);
//     setVenue(response);
//   };
// };

export default App;
