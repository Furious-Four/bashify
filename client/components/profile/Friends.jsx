import React from 'react';

const Friends = ({ user: { friends } }) => {
  return (
    <div>
      <div>
        <h3>Friends</h3>
        {friends
          .filter((friend) => friend.friendships.status === 'ACCEPTED')
          .map((friend) => (
            <div key={friend.id}>{friend.fullName}</div>
          ))}
      </div>

      <div>
        <h3>Requests</h3>
        {friends
          .filter((friend) => friend.friendships.status === 'PENDING')
          .map((friend) => (
            <div key={friend.id}>{friend.fullName}</div>
          ))}
      </div>
    </div>
  );
};

export default Friends;
