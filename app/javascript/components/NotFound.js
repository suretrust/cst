import React from 'react';
import Layout from './Layout';

const NotFound = () => {
  return (
    <Layout>
      <div className="not-found text-center">
        <h4>Page not found!</h4>
        <a href="/" className="link">
          Return to home
        </a>
      </div>
    </Layout>
  );
};

export default NotFound;
