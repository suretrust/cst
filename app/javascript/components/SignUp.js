import React, { useState } from 'react';
import Axios from 'axios';
import jwtDecode from 'jwt-decode';

const SignUp = ({ history }) => {
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwdError, setPwdError] = useState('');
  const [userType, setUserType] = useState('');

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    setPwdError('');
  };

  const handleConfirmPassword = e => {
    setConfirmPassword(e.target.value);
    setPwdError('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (state.password !== confirmPassword) {
      setPwdError('Passwords does not match');
      return;
    } else {
      setPwdError('');
    }

    Axios.post('/users', state)
      .then(res => {
        localStorage.setItem('jwt', res.data.jwt);
        const user = jwtDecode(res.data.jwt);
        setUserType(user.type);
        if (userType === 'Client') history.push('/dashboard');
        if (userType === 'Agent') history.push('/agent-dashboard');
        if (userType === 'Admin') history.push('/admin-dashboard');
      })
      .catch(err => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
      </div>
      <div>
        <label htmlFor="confirmPassword">Password confirmation</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={confirmPassword}
          onChange={handleConfirmPassword}
          placeholder="Password confirmation"
          required
        />
        <small>{pwdError}</small>
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;
