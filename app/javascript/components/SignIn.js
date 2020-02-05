import React, { useState } from 'react';
import Axios from 'axios';

const SignIn = () => {
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    Axios.post('/tokens', state).then(res => {
      console.log(res.data.jwt);
      localStorage.setItem('jwt', res.data.jwt);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
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
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignIn;
