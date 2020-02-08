import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <main className="d-flex flex-column align-items-center main">
      <h2>Welcome to CST</h2>
      <div className="mt-5">
        <Link to="/sign-up" className="btn btn-outline-info mr-2">
          Sign Up
        </Link>
        <Link to="/sign-in" className="btn btn-info">
          Sign In
        </Link>
      </div>
    </main>
  );
};

export default Home;
