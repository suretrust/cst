import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { getTickets } from '../utilities/api';
import { Link } from 'react-router-dom';
import Layout from './Layout';

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
    <Layout>
      <div>
        <h2>Open Tickets</h2>
        {tickets.filter(ticket => ticket.user_id === userId && ticket.status)
          .length > 0 ? (
          tickets
            .filter(ticket => ticket.user_id === userId && ticket.status)
            .map(tick => (
              <div key={tick.id}>
                <Link to={`/ticket/${tick.id}`}>{tick.title}</Link>
                <p>{tick.message}</p>
              </div>
            ))
        ) : (
          <p>You have no open tickets.</p>
        )}
      </div>

      <div>
        <h2>Closed Tickets</h2>
        {tickets.filter(ticket => ticket.user_id === userId && ticket.status)
          .length > 0 ? (
          tickets
            .filter(ticket => ticket.user_id === userId && !ticket.status)
            .map(tick => (
              <div key={tick.id}>
                <Link to={`/ticket/${tick.id}`}>{tick.title}</Link>
                <p>{tick.message}</p>
              </div>
            ))
        ) : (
          <p>You have no closed tickets.</p>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
