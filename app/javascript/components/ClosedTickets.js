import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { Link } from 'react-router-dom';
import { getTickets } from '../utilities/api';
import Layout from './Layout';

const ClosedTickets = ({ history }) => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      history.push('/sign-in');
    } else {
      if (jwtDecode(jwt).type === 'Agent' || jwtDecode(jwt).type === 'Admin') {
        getTickets(setTickets);
      } else {
        history.push('/not-found');
      }
    }
  }, [tickets]);

  return (
    <Layout>
      <h2>Closed Tickets</h2>
      {tickets.filter(ticket => !ticket.status).length > 0 ? (
        tickets
          .filter(ticket => !ticket.status)
          .map(tick => (
            <div key={tick.id}>
              <Link to={`/ticket/${tick.id}`}>{tick.title}</Link>
              <p>{tick.message}</p>
            </div>
          ))
      ) : (
        <p>There is no closed ticket.</p>
      )}
    </Layout>
  );
};

export default ClosedTickets;
