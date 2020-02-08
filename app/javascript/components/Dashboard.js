import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { Link } from 'react-router-dom';
import { getTickets } from '../utilities/api';
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
  }, [tickets]);

  return (
    <Layout>
      <div className="p-2 tickets">
        <h2 className="mb-3">Open Tickets</h2>
        {tickets.filter(ticket => ticket.user_id === userId && ticket.status)
          .length > 0 ? (
          tickets
            .filter(ticket => ticket.user_id === userId && ticket.status)
            .map(tick => (
              <div className="shadow-sm p-3 mb-4 bg-light" key={tick.id}>
                <Link to={`/ticket/${tick.id}`}>
                  <h4 className="text-info">{tick.title}</h4>
                </Link>
                <p>{tick.message}</p>
              </div>
            ))
        ) : (
          <p className="shadow-sm p-3 mb-4 bg-light">
            You have no open tickets.
          </p>
        )}
      </div>

      <div className="p-2 tickets">
        <h2 className="mb-3">Closed Tickets</h2>
        {tickets.filter(ticket => ticket.user_id === userId && !ticket.status)
          .length > 0 ? (
          tickets
            .filter(ticket => ticket.user_id === userId && !ticket.status)
            .map(tick => (
              <div className="shadow-sm p-3 mb-4 bg-light" key={tick.id}>
                <Link className="text-info" to={`/ticket/${tick.id}`}>
                  <h4>{tick.title}</h4>
                </Link>
                <p>{tick.message}</p>
              </div>
            ))
        ) : (
          <p className="shadow-sm p-3 mb-4 bg-light">
            You have no closed tickets.
          </p>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
