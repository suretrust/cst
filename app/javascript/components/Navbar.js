import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';

const Navbar = () => {
  const [userType, setUserType] = useState('');

  useEffect(() => {
    const jwt = jwtDecode(localStorage.getItem('jwt'));
    if (!jwt) {
      history.push('/not-found');
    } else {
      setUserType(jwt.type);
    }
  }, []);

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
        </ul>
      ) : (
        ''
      )}
    </nav>
  );
};

export default Navbar;
