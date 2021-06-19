import React, { useState } from 'react';
import axios from 'axios';

const CurrentTab = () => {
  const [tab, setTab] = useState({});

  useEffect(async () => {
    try {
      const token = window.localStorage.getItem('token');
      const { data: tab } = await axios.get(`/api/user/tab/current`, {
        headers: { authorization: token },
      });
      setTab(tab);
      setLoading(false);
      console.log(tab);
    } catch (ex) {
      console.log(ex);
    }
  }, []);

  return (
    <div>
      <h1> User's Current Tab </h1>
      <h2> Drinks </h2>

      <div> `tab is ${tab}` </div>
      <hr />
      <h4> SubTotal </h4>
      <h5> Tax </h5>
      <h6> Tip </h6>
      <h4> Total </h4>
    </div>
  );
};

export default CurrentTab;
