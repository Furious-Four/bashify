import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import { LoginPage, LoginForm, LoginLabel } from '../../styles/LoginForm';

const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const updateForm = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    try {
      const {
        data: { token },
      } = await axios.post('/api/user/auth', form);
      window.localStorage.setItem('token', token);
    } catch (err) {
      if (err.status === 401) {
        window.alert('That email and password did not match');
      }
      console.error(err);
    }
  };

  return (
    <LoginPage>
      <h1>Login</h1>
      <LoginForm>
        <LoginLabel htmlFor="email">
          Email:
          <input name="email" onChange={updateForm}></input>
        </LoginLabel>
        <LoginLabel htmlFor="password">
          Password:
          <input name="password" type="password" onChange={updateForm}></input>
        </LoginLabel>
        <button onClick={handleSubmit}>Submit</button>
      </LoginForm>
    </LoginPage>
  );
};

export default Login;
