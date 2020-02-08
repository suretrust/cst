import React, { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import Layout from './Layout';

const Agents = () => {
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      history.push('/sign-in');
    } else {
      if (jwtDecode(jwt).type !== 'Admin') history.push('/not-found');
    }
  }, []);

  return (
    <Layout>
      <p>I am an agent, fucker!</p>
    </Layout>
  );
};

export default Agents;
