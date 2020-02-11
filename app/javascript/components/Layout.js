import React from 'react';
import PropTypes, { shape } from 'prop-types';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Navbar />
      <div className="children">{children}</div>
      <Footer />
    </React.Fragment>
  );
};

// Layout.propTypes = {
//   children: PropTypes.shape(shape).isRequired,
// };

export default Layout;
