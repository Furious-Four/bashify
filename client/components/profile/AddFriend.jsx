import React, { useState } from 'react';

import { FriendRequestForm } from '../../styles/Profile';

const AddFriend = () => {
  const [form, setForm] = useState({
    email: '',
    phone: '',
    username: '',
  });

  const updateForm = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  return (
    <FriendRequestForm>
      <label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={updateForm}
        ></input>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={updateForm}
        ></input>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={updateForm}
        ></input>
      </label>
    </FriendRequestForm>
  );
};

export default AddFriend;
