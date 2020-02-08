import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from './auth';

const SignIn = ({ history }) => {
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const [loginError, setLoginError] = useState('');

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    login(state, setLoginError, history);
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>{loginError}</p>
      <h2>Sign In</h2>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
          className="form-control mb-4"
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
          minLength="6"
          className="form-control mb-4"
          required
        />
      </div>
      <button type="submit" className="btn btn-info mb-5">
        Sign In
      </button>
      <p>
        Don't have an account? <Link to="/sign-up">Sign Up</Link>
      </p>
    </form>
  );
};

export default SignIn;
