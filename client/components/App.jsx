/* eslint-disable no-unused-vars */
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
import CurrentTab from './tabs/CurrentTab';
import Profile from './profile/Profile.jsx';
import AllDrinks from './drinks/AllDrinks.jsx';
import AllVenues from './venues/AllVenues.jsx';
import SingleDrink from './drinks/SingleDrink.jsx';
import CurrentOrder from './orders/CurrentOrder.jsx';
import { connectUserSocket } from './utils/Socket.js';

const App = () => {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [socket, setSocket] = useState(null);

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
      if (localToken) {
        setToken(localToken);
        setLoggedIn(true);
      }
    }
    if (!user.id && loggedIn) {
      try {
        await fetchUserDetails(token);
        const socket = connectUserSocket(token, 'test');
        setSocket(socket);
      } catch (err) {
        console.error(err);
        window.localStorage.removeItem('token');
        setToken(null);
        setLoggedIn(false);
      }
    }
    if (user.id && !loggedIn) {
      setUser({});
      setToken(null);
      socket.disconnect();
      setSocket(null);
    }
  }, [loggedIn, token, user]);

  return (
    <Router>
      <MainNav user={user} setLoggedIn={setLoggedIn} />
      <Switch>
        <Route path="/" exact component={AllVenues} />
        <Route exact path="/login">
          {loggedIn ? <Redirect to="/" /> : <Login setLoggedIn={setLoggedIn} />}
        </Route>
        <Route path="/register">
          {loggedIn ? (
            <Redirect to="/" />
          ) : (
            <Register setLoggedIn={setLoggedIn} />
          )}
        </Route>
        <Route path="/profile">
          <Profile user={user} />
        </Route>
        <Route path="/order">
          <CurrentOrder user={user} setUser={setUser} />
        </Route>
        <Route path="/tab" component={CurrentTab}></Route>
        <Route exact path="/venue/:id" component={AllDrinks}></Route>
        <Route
          exact
          path="/venue/:id/drink/:drinkid"
          component={SingleDrink}
        ></Route>
        {/*
        AllDrinks
        SingleDrink
        CurrentTab
        VenueLandingPage
      */}
      </Switch>
    </Router>
  );
};

export default App;
