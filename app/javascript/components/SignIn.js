import React, { useState } from 'react';
import Axios from 'axios';
import jwtDecode from 'jwt-decode';

const SignIn = ({ history }) => {
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const [userType, setUserType] = useState('');

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    Axios.post('/tokens', state).then(res => {
      localStorage.setItem('jwt', res.data.jwt);
      const user = jwtDecode(res.data.jwt);
      setUserType(user.type);
      if (userType === 'Client') history.push('/dashboard');
      if (userType === 'Agent') history.push('/agent-dashboard');
      if (userType === 'Admin') history.push('/admin-dashboard');
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
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignIn;
