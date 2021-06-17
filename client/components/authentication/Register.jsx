import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';

import {
  RegisterPage,
  RegisterForm,
  RegisterLabel,
} from '../../styles/RegisterForm';
import { Button } from '../../styles/GlobalStyle';

const Register = () => {
  const history = useHistory();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phone: '',
  });

  const formatTelephone = (number) => {
    let [first, second, third] = number.split('-');
    const joinStrings = [];
    if (first) {
      if (first.length > 3) {
        second = first.slice(3) + (second || '');
      }
      joinStrings.push(first.slice(0, 3));
    }
    if (second) {
      if (second.length > 3) {
        third = second.slice(3) + (third || '');
      }
      joinStrings.push(second.slice(0, 3));
    }
    if (third) {
      joinStrings.push(third.slice(0, 4));
    }
    number = joinStrings.join('-');
    return number;
  };

  const updateForm = ({ target: { name, value } }) => {
    if (name === 'phone') {
      value = formatTelephone(value);
    }
    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    let validForm = true;
    for (let key in form) {
      let validKey = true;
      if (form[key] === '') validForm = validKey = false;

      if (key === 'email') {
        let emailParts = form[key].split('@');
        if (emailParts.length !== 2) validForm = validKey = false;
        else {
          emailParts.forEach((emailHalf, index) => {
            if (emailHalf === '') validForm = validKey = false;
            if (index === 1) {
              if (!emailHalf) validForm = validKey = false;
              else {
                const urlParts = emailHalf.split('.');
                if (urlParts.length !== 2) validForm = validKey = false;
                urlParts.forEach((urlHalf) => {
                  if (urlHalf === '') validForm = validKey = false;
                });
              }
            }
          });
        }
      }

      if (key === 'phone') {
        if (form[key].length < 12) validForm = validKey = false;
        else {
          form[key].split('-').forEach((value, index) => {
            let len = index < 2 ? 3 : 4;
            if (value.length !== len) validForm = validKey = false;
            value.split('').forEach((value) => {
              if (!Number.isInteger(parseInt(value, 10)))
                validForm = validKey = false;
            });
          });
        }
      }

      const label = document.querySelector(`label#${key}`);
      if (validKey && label.className.includes('invalid'))
        label.classList.toggle('invalid');
      if (!validKey && !label.className.includes('invalid'))
        label.classList.toggle('invalid');
    }

    return validForm;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    try {
      if (!validateForm()) throw new Error('bad form');
      form.phone = form.phone.split('-').join('');
      const {
        data: { token },
      } = await axios.post('/api/user', form);
      window.localStorage.setItem('token', token);
      history.push('/');
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <RegisterPage>
      <h1>Register</h1>
      <RegisterForm>
        <RegisterLabel htmlFor="username" id="username">
          Username:
          <input
            name="username"
            onChange={updateForm}
            value={form.username}
          ></input>
        </RegisterLabel>
        <RegisterLabel htmlFor="password" id="password">
          Password:
          <input
            name="password"
            type="password"
            onChange={updateForm}
            value={form.password}
          ></input>
        </RegisterLabel>
        <RegisterLabel htmlFor="firstName" id="firstName">
          First Name:
          <input name="firstName" onChange={updateForm}></input>
        </RegisterLabel>
        <RegisterLabel htmlFor="lastName" id="lastName">
          Last Name:
          <input name="lastName" onChange={updateForm}></input>
        </RegisterLabel>
        <RegisterLabel htmlFor="email" id="email">
          Email:
          <input name="email" type="email" onChange={updateForm}></input>
        </RegisterLabel>
        <RegisterLabel htmlFor="phone" id="phone">
          Phone:
          <input
            name="phone"
            type="tel"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            onChange={updateForm}
            value={form.phone}
          ></input>
        </RegisterLabel>
      </RegisterForm>
      <Button onClick={handleSubmit}>Register</Button>
      <div>
        <span>Have an account? </span>
        <Link to="/login">Login</Link>
      </div>
    </RegisterPage>
  );
};

export default Register;
