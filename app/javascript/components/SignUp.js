import React, { useState } from 'react';

const SignUp = () => {
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwdError, setPwdError] = useState('');

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
