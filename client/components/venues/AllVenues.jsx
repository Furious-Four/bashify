import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import { AllVenuesPage, SingleVenue } from '../../styles/AllVenues';

const AllVenues = ({ setAppVenue }) => {
  const [venues, setVenues] = useState([]);

  const getAllVenues = async () => {
    try {
      const { data: venues } = await axios.get('/api/venue');
      setVenues(venues);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (venues.length === 0) {
      getAllVenues();
    }
  });

  return (
    <AllVenuesPage animate={{ scale: [0, 1] }}>
      {venues.map((venue) => {
        return (
          <SingleVenue
            key={venue.id}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href={`/#/venue/${venue.id}`}
            onClick={() => setAppVenue(venue)}
          >
            <h1 style={{ fontWeight: 100, marginBottom: 0 }}>{venue.name}</h1>
            <hr />
            {venue.address} | {venue.website}
          </SingleVenue>
        );
      })}
    </AllVenuesPage>
  );
};

export default AllVenues;
