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
      <div className="tickets p-2">
        <h2 className="mb-4">Closed Tickets</h2>
        {tickets.filter(ticket => !ticket.status).length > 0 ? (
          tickets
            .filter(ticket => !ticket.status)
            .map(tick => (
              <div className="shadow-sm p-3 mb-4 bg-light" key={tick.id}>
                <Link to={`/ticket/${tick.id}`}>
                  <h4 className="text-info">{tick.title}</h4>
                </Link>
                <p>{tick.message}</p>
              </div>
            ))
        ) : (
          <p>There is no closed ticket.</p>
        )}
      </div>
    </Layout>
  );
};

export default ClosedTickets;
