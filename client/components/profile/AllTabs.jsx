import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { TabTab, TabCard } from '../../styles/Profile';

const AllTabs = () => {
  const [loading, setLoading] = useState(true);
  const [tabs, setTabs] = useState([]);

  useEffect(async () => {
    if (loading === true) {
      try {
        const token = window.localStorage.getItem('token');
        const { data } = await axios.get('/api/user/tab/all', {
          headers: { authorization: token },
        });
        setTabs(data);
        setLoading('success');
      } catch (err) {
        console.error(err);
        setLoading('failure');
      }
    }
  }, [loading]);

  return (
    <TabTab>
      {loading === true ? (
        <TabCard>Loading . . . </TabCard>
      ) : loading === 'success' ? (
        tabs.length ? (
          tabs.map((tab) => {
            <TabCard />;
          })
        ) : (
          <TabCard>No past tabs</TabCard>
        )
      ) : (
        <TabCard>Failed to load tabs</TabCard>
      )}
    </TabTab>
  );
};

export default AllTabs;
