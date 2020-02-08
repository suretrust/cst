import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { logOut } from './auth';

const Navbar = ({ history }) => {
  const [userType, setUserType] = useState('');

  useEffect(() => {
    const jwt = jwtDecode(localStorage.getItem('jwt'));
    if (!jwt) {
      history.push('/sign-in');
    } else {
      setUserType(jwt.type);
    }
  }, []);

  const handleClick = () => {
    logOut();
  };

  return (
    <nav>
      {userType === 'Client' ? (
        <ul>
          <li>
            <a href="/new-ticket">Create a new ticket</a>
          </li>
          <li>
            <a href="/dashboard">Tickets</a>
          </li>
          <li>
            <button type="button" onClick={handleClick}>
              Logout
            </button>
          </li>
        </ul>
      ) : (
        ''
      )}

      {userType === 'Agent' ? (
        <ul>
          <li>
            <a href="/agent-dashboard">Open Tickets</a>
          </li>
          <li>
            <a href="/closed-tickets">Closed Tickets</a>
          </li>
          <li>
            <button type="button" onClick={handleClick}>
              Logout
            </button>
          </li>
        </ul>
      ) : (
        ''
      )}

      {userType === 'Admin' ? (
        <ul>
          <li>
            <a href="/clients">Clients</a>
          </li>
          <li>
            <a href="/agents">Agents</a>
          </li>
          <li>
            <a href="/admins">Admins</a>
          </li>
          <li>
            <a href="/admin-dashboard">Open Tickets</a>
          </li>
          <li>
            <a href="/closed-tickets">Closed Tickets</a>
          </li>
          <li>
            <button type="button" onClick={handleClick}>
              Logout
            </button>
          </li>
        </ul>
      ) : (
        ''
      )}
    </nav>
  );
};

export default Navbar;
