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
      <div className="p-2 tickets">
        <h2 className="mb-4">Open tickets</h2>
        {tickets.filter(ticket => ticket.status).length > 0 ? (
          tickets
            .reverse()
            .filter(ticket => ticket.status)
            .map(tick => (
              <div
                className="shadow-sm p-3 mb-4 bg-light"
                key={tick.id}
                key={tick.id}
              >
                <Link to={`/ticket/${tick.id}`}>
                  <h4 className="text-info">{tick.title}</h4>
                </Link>
                <p>{tick.message}</p>
                <hr />
                <button
                  type="submit"
                  className="btn btn-sm btn-info"
                  id={`@@${tick.id}`}
                  onClick={handleCloseTicket}
                >
                  Close Ticket
                </button>
              </div>
            ))
        ) : (
          <p className="shadow-sm p-3 mb-4 bg-light">
            There is no open ticket.
          </p>
        )}
      </div>
    </Layout>
  );
};

export default AdminDashboard;
