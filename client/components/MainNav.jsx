import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

import {
  MainNavDiv,
  NavSlideout,
  NavTopbar,
  SlideoutOptions,
  SlideoutOpt,
} from '../styles/MainNav';

const MainNav = ({ user }) => {
  const [isExpanded, setExpanded] = useState(false);
  const history = useHistory();
  const location = useLocation().pathname.split('/')[1];

  const expandMenu = (ev) => setExpanded(true);

  const collapseMenu = (ev) => setExpanded(false);

  const navigate = (path) => {
    history.push(`/${path}`);
    collapseMenu();
  };

  const logout = () => {
    window.localStorage.removeItem('token');
    history.push('/');
    collapseMenu();
  };

  console.log(location);
  return (
    <MainNavDiv>
      <NavTopbar>
        {isExpanded ? (
          <div>
            <div></div>
            <div onClick={collapseMenu}>
              <img src="/public/exit.svg" width="20em" />
            </div>
          </div>
        ) : (
          <div>
            <div onClick={expandMenu}>
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
          </div>
        )}
      </NavTopbar>
      {isExpanded ? (
        <NavSlideout>
          <SlideoutOptions>
            <SlideoutOpt
              current={location === 'profile'}
              onClick={() => navigate('profile')}
            >
              Profile
            </SlideoutOpt>
            <SlideoutOpt
              current={location === 'menu'}
              onClick={() => navigate('menu')}
            >
              Menu
            </SlideoutOpt>
            <SlideoutOpt
              current={location === 'order'}
              onClick={() => navigate('order')}
            >
              Current Order
            </SlideoutOpt>
            <SlideoutOpt
              current={location === 'tab'}
              onClick={() => navigate('tab')}
            >
              Your Tab
            </SlideoutOpt>
            <SlideoutOpt
              current={location === 'splits'}
              onClick={() => navigate('splits')}
            >
              Your Splits
            </SlideoutOpt>
          </SlideoutOptions>
          <SlideoutOpt current={location === 'logout'} onClick={logout}>
            Log Out
          </SlideoutOpt>
        </NavSlideout>
      ) : (
        ''
      )}
    </MainNavDiv>
  );
};

export default MainNav;
