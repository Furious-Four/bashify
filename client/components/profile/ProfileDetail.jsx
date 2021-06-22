import React from 'react';

import { DetailTab, DetailRow } from '../../styles/Profile';

const ProfileDetail = ({ user }) => {
  return (
    <DetailTab>
      <DetailRow>
        <div>Username</div>
        <div>{user.username}</div>
      </DetailRow>
      <DetailRow>
        <div>Name</div>
        <div>{user.fullName}</div>
      </DetailRow>
      <DetailRow>
        <div>Email</div>
        <div>{user.email}</div>
      </DetailRow>
      <DetailRow>
        <div>Phone</div>
        <div>{user.phone}</div>
      </DetailRow>
    </DetailTab>
  );
};

export default ProfileDetail;
