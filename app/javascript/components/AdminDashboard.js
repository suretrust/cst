import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { Link } from 'react-router-dom';
import { getTickets, closeTicket } from '../utilities/api';
import Layout from './Layout';

const AdminDashboard = ({ history }) => {
  const [tickets, setTickets] = useState([]);
  const [userId, setUserId] = useState();

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      history.push('/sign-in');
    } else {
      if (jwtDecode(jwt).type !== 'Admin') history.push('/not-found');
      getTickets(setTickets);
      const id = jwtDecode(jwt).id;
      setUserId(id);
    }
  }, [tickets]);

  const handleCloseTicket = e => {
    const id = e.target.id.split('@@')[1];
    closeTicket(id, userId);
  };

  return (
    <Layout>
      <h2>Open tickets</h2>
      {tickets.filter(ticket => ticket.status).length > 0 ? (
        tickets
          .reverse()
          .filter(ticket => ticket.status)
          .map(tick => (
            <div key={tick.id}>
              <Link to={`/ticket/${tick.id}`}>{tick.title}</Link>
              <button
                type="submit"
                id={`@@${tick.id}`}
                onClick={handleCloseTicket}
              >
                Close Ticket
              </button>
              <p>{tick.message}</p>
            </div>
          ))
      ) : (
        <p>There is no open ticket.</p>
      )}
    </Layout>
  );
};

export default AdminDashboard;
