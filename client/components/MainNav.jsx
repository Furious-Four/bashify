import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { MainNavDiv } from '../styles/MainNav';

const MainNav = ({ user }) => {
  console.log(user);
  return (
    <MainNavDiv>
      <div>Bashify</div>
      <div>
        {user.id ? (
          `Welcome, ${user.firstName}`
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </MainNavDiv>
  );
};

export default MainNav;
