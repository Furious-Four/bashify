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
import CurrentOrder from './orders/CurrentOrder.jsx'

const App = () => {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

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

  useEffect(() => {
    // Like componentDidMount and componentDidUpdate all in one
    const token = window.localStorage.getItem('token');
    if (token && !loggedIn) {
      setLoggedIn(true);
      fetchUserDetails(token);
    }
  });

  return (
    <Router>
      <MainNav user={user} />
      <Switch>
        <Route path="/">
          <CurrentOrder/>
        </Route>
        {/* <Route path="/login">
          {loggedIn ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route path="/register">
          {loggedIn ? <Redirect to="/" /> : <Register />}
        </Route> */}
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
