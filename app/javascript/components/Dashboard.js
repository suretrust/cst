import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { getTickets } from '../utilities/api';
import { Link } from 'react-router-dom';

const Dashboard = ({ history }) => {
  const [tickets, setTickets] = useState([]);
  const [userId, setUserId] = useState();

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      history.push('/sign-in');
    } else {
      if (jwtDecode(jwt).type !== 'Client') history.push('/not-found');
      getTickets(setTickets);
      const id = jwtDecode(jwt).id;
      setUserId(id);
    }
  }, []);

  return (
    <div>
      <div>
        <h2>Open Tickets</h2>
        {tickets
          .filter(ticket => ticket.user_id === userId && ticket.status)
          .map(tick => (
            <div key={tick.id}>
              <Link to={`/ticket/${tick.id}`}>{tick.title}</Link>
              <p>{tick.message}</p>
            </div>
          ))}
      </div>

      <div>
        <h2>Closed Tickets</h2>
        {tickets
          .filter(ticket => ticket.user_id === userId && !ticket.status)
          .map(tick => (
            <div key={tick.id}>
              <Link to={`/ticket/${tick.id}`}>{tick.title}</Link>
              <p>{tick.message}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
