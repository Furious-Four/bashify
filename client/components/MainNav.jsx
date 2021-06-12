import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { MainNavDiv } from '../styles/MainNav';

const MainNav = ({ user }) => {
  console.log(user);
  return (
    <MainNavDiv>
      <div>bashify</div>
      <div>
        {user.id ? (
          <div>`Welcome, ${user.firstName}`</div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </MainNavDiv>
  );
};

export default MainNav;
