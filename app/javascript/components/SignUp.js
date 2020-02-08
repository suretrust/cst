import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { signUp } from './auth';

const SignUp = ({ history }) => {
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwdError, setPwdError] = useState('');
  const [signUpError, setSignUpError] = useState('');

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
    signUp(state, setSignUpError, history);
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>{signUpError}</p>
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
          minLength="6"
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
      <p>
        Already have an account? <Link to="/sign-in">Sign In</Link>
      </p>
    </form>
  );
};

export default SignUp;
