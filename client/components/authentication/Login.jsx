import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';

import { LoginPage, LoginForm, LoginLabel } from '../../styles/LoginForm';
import { Button } from '../../styles/GlobalStyle';

const Login = ({ setLoggedIn }) => {
  const history = useHistory();

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
      setLoggedIn(true);
      history.push('/');
    } catch (err) {
      if (err.status === 401) {
        window.alert('That email and password did not match');
      }
      console.error(err);
    }
  };

  return (
    <LoginPage>
      <h1>login</h1>
      <LoginForm>
        <LoginLabel htmlFor="email">
          email:
          <input name="email" onChange={updateForm}></input>
        </LoginLabel>
        <LoginLabel htmlFor="password">
          password:
          <input name="password" type="password" onChange={updateForm}></input>
        </LoginLabel>
      </LoginForm>
      <Button onClick={handleSubmit}>log in</Button>
      <div>
        need an account? <Link to="/register">register</Link>
      </div>
    </LoginPage>
  );
};

export default Login;
