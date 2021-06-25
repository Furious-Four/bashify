import React, { useEffect, useState } from 'react';

import AllTabs from './AllTabs.jsx';
import ProfileDetail from './ProfileDetail.jsx';
import Friends from './Friends.jsx';
import { ProfilePage, ProfileTabs, TabOption } from '../../styles/Profile.js';
import { useHistory, useLocation } from 'react-router-dom';

const Profile = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('details');
  const { search } = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (loading) {
      const params = new URLSearchParams(search);
      const currTab = params.get('tab');
      if (currTab) setTab(currTab);
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    const params = new URLSearchParams(search);
    params.set('tab', tab);
    history.push({ search: params.toString() });
  }, [tab]);

  const changeTab = (tabName) => {
    setTab(tabName);
  };

  return (
    <ProfilePage>
      <h1>Profile</h1>
      <ProfileTabs total={3}>
        <TabOption
          onClick={() => changeTab('details')}
          bold={tab === 'details'}
        >
          Details
        </TabOption>
        <TabOption
          onClick={() => changeTab('friends')}
          bold={tab === 'friends'}
        >
          Friends
        </TabOption>
        <TabOption onClick={() => changeTab('tabs')} bold={tab === 'tabs'}>
          Tabs
        </TabOption>
      </ProfileTabs>
      {tab === 'details' ? <ProfileDetail user={user} /> : ''}
      {tab === 'friends' ? <Friends user={user} /> : ''}
      {tab === 'tabs' ? <AllTabs user={user} /> : ''}
    </ProfilePage>
  );
};

export default Profile;
