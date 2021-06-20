import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CurrentTab = () => {
  const [tab, setTab] = useState([]);
  //   const [loading, setLoading] = useState(true);

  useEffect(async () => {
    try {
      const token = window.localStorage.getItem('token');
      const { data: tab } = await axios.get(`/api/user/tab/current`, {
        headers: { authorization: token },
      });
      setTab(tab);
      //   setLoading(false);
      console.log(tab);
    } catch (ex) {
      console.log(ex);
    }
  }, []);
  //   if (loading) {
  //     return <div>...loading </div>;
  //   } else {
  return (
    <div>
      <h1> Current Tab </h1>
      <h2> Drinks </h2>

      <div> `tab is ${tab}` </div>
      <hr />
      <h4> SubTotal </h4>
      <h5> Tax </h5>
      <h6> Tip </h6>
      <h4> Total </h4>
    </div>
  );
  //   }
};

export default CurrentTab;
