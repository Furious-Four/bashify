import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { MainNavDiv } from '../styles/MainNav';

const MainNav = ({ user }) => {
  console.log(user);
  return (
    <MainNavDiv>
      <div>
        <img src="/public/menu.svg" width="20em" />
      </div>
      <Link to="/">bashify</Link>
      <div>
        {user.id ? (
          <div>Welcome, {user.firstName}</div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </MainNavDiv>
  );
};

export default MainNav;
