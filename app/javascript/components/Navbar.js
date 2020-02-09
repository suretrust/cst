import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { logOut } from './auth';
import { Link } from 'react-router-dom';

const Navbar = ({ history }) => {
  const [userType, setUserType] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const jwt = jwtDecode(localStorage.getItem('jwt'));
    if (!jwt) {
      history.push('/sign-in');
    } else {
      setUserType(jwt.type);
      setUserId(jwt.id);
    }
  }, []);

  const handleClick = () => {
    logOut();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-info text-white px-lg-5">
      <a className="navbar-brand text-white font-weight-bold" href="/">
        CST
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon text-white"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {userType === 'Client' ? (
          <ul className="navbar-nav ml-auto">
            <li>
              <a href="/new-ticket" className="ml-0 ml-lg-3">
                Create a new ticket
              </a>
            </li>
            <li>
              <a href="/dashboard" className="ml-0 ml-lg-3">
                Tickets
              </a>
            </li>
            <li>
              <Link
                to="/sign-in"
                onClick={handleClick}
                className="ml-0 ml-lg-3"
              >
                Logout
              </Link>
            </li>
          </ul>
        ) : (
          ''
        )}

        {userType === 'Agent' ? (
          <ul className="navbar-nav ml-auto">
            <li className="ml-0 ml-lg-3">
              <a href="/agent-dashboard">Open Tickets</a>
            </li>
            <li className="ml-0 ml-lg-3">
              <a href="/closed-tickets">Closed Tickets</a>
            </li>
            <li className="ml-0 ml-lg-3">
              <a href="/api/v1/tickets.pdf">Processed Tickets Report (PDF)</a>
            </li>
            <li>
              <Link
                to="/sign-in"
                onClick={handleClick}
                className="ml-0 ml-lg-3"
              >
                Logout
              </Link>
            </li>
          </ul>
        ) : (
          ''
        )}

        {userType === 'Admin' ? (
          <ul className="navbar-nav ml-auto">
            <li className="ml-0 ml-lg-3">
              <a href="/clients">Clients</a>
            </li>
            <li className="ml-0 ml-lg-3">
              <a href="/agents">Agents</a>
            </li>
            <li className="ml-0 ml-lg-3">
              <a href="/admins">Admins</a>
            </li>
            <li className="ml-0 ml-lg-3">
              <a href="/admin-dashboard">Open Tickets</a>
            </li>
            <li className="ml-0 ml-lg-3">
              <a href="/closed-tickets">Closed Tickets</a>
            </li>
            <li className="ml-0 ml-lg-3">
              <a href="/api/v1/tickets.pdf">Processed Tickets Report (PDF)</a>
            </li>
            <li>
              <Link
                to="/sign-in"
                onClick={handleClick}
                className="ml-0 ml-lg-3"
              >
                Logout
              </Link>
            </li>
          </ul>
        ) : (
          ''
        )}
      </div>
    </nav>
  );
};

export default Navbar;
