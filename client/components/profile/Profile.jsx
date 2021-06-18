import React, { useState } from 'react';

import ProfileDetail from './ProfileDetail.jsx';
import Friends from './Friends.jsx';
import { ProfilePage, ProfileTabs, TabOption } from '../../styles/Profile.js';

const Profile = ({ user }) => {
  const [tab, setTab] = useState('details');

  return (
    <ProfilePage>
      <h1>Profile</h1>
      <ProfileTabs>
        <TabOption onClick={() => setTab('details')} bold={tab === 'details'}>
          Details
        </TabOption>
        <TabOption onClick={() => setTab('friends')} bold={tab === 'friends'}>
          Friends
        </TabOption>
        <TabOption onClick={() => setTab('tabs')} bold={tab === 'tabs'}>
          Tabs
        </TabOption>
      </ProfileTabs>
      {tab === 'details' ? <ProfileDetail user={user} /> : ''}
      {tab === 'friends' ? <Friends user={user} /> : ''}
      {tab === 'tabs' ? <div>TABS</div> : ''}
    </ProfilePage>
  );
};

export default Profile;
