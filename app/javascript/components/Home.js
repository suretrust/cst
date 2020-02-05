import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <main>
      <h2>Welcome to CST</h2>
      <Link to="/sign-up">Sign Up</Link>
      <Link to="/sign-in">Sign In</Link>
    </main>
  );
};

export default Home;
