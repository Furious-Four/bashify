import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

import {
  MainNavDiv,
  NavSlideout,
  NavTopbar,
  SlideoutOptions,
  SlideoutOpt,
} from '../styles/MainNav';

const MainNav = ({ user, setLoggedIn }) => {
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
    setLoggedIn(false);
    history.push('/');
    collapseMenu();
  };

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
            {user.id ? (
              <div onClick={expandMenu}>
                <img src="/public/menu.svg" width="20em" />
              </div>
            ) : (
              <Link to="/menu">menu</Link>
            )}
            <Link to="/">bashify</Link>
            {user.id ? (
              <Link to="/tab">tab</Link>
            ) : (
              <Link to="/login">login</Link>
            )}
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
              profile
            </SlideoutOpt>
            <SlideoutOpt
              current={location === 'menu'}
              onClick={() => navigate('menu')}
            >
              menu
            </SlideoutOpt>
            <SlideoutOpt
              current={location === 'order'}
              onClick={() => navigate('order')}
            >
              current order
            </SlideoutOpt>
            <SlideoutOpt
              current={location === 'tab'}
              onClick={() => navigate('tab')}
            >
              your tab
            </SlideoutOpt>
            <SlideoutOpt
              current={location === 'splits'}
              onClick={() => navigate('splits')}
            >
              your splits
            </SlideoutOpt>
          </SlideoutOptions>
          <SlideoutOpt current={location === 'logout'} onClick={logout}>
            log out
          </SlideoutOpt>
        </NavSlideout>
      ) : (
        ''
      )}
    </MainNavDiv>
  );
};

export default MainNav;
