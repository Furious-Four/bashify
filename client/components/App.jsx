import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      {/* MainNav */}
      <Switch>
        {/*
        AllDrinks
        SingleDrink
        Login
        SignUp
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
