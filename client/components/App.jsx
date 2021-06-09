import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Route></Route>
      <Switch></Switch>
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
