import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTickets, closeTicket } from '../utilities/api';
import Layout from './Layout';
import { setTickets, setOpenTickets } from '../actions';

const mapStateToProps = state => ({
  openTickets: state.openTickets,
});

const mapDispatchToProps = dispatch => ({
  setTickets: tickets => dispatch(setTickets(tickets)),
  setOpenTickets: openTickets => dispatch(setOpenTickets(openTickets)),
});

const AdminDashboard = ({
  history,
  openTickets,
  setTickets,
  setOpenTickets,
}) => {
  const [userId, setUserId] = useState();
  const [success, setSucess] = useState('');

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      history.push('/sign-in');
    } else {
      if (jwtDecode(jwt).type !== 'Admin') history.push('/not-found');
      getTickets(setTickets, setOpenTickets);
      const id = jwtDecode(jwt).id;
      setUserId(id);
    }
  }, [setTickets, handleCloseTicket]);

  const handleCloseTicket = e => {
    e.preventDefault();
    const id = e.target.id.split('@@')[1];
    closeTicket(id, userId, setOpenTickets, setTickets);
    setSucess('Ticket sucessfully closed!');
    setTimeout(() => {
      setSucess('');
    }, 1500);
  };

  return (
    <Layout>
      {success ? (
        <p className="alert alert-success text-center">{success}</p>
      ) : (
        ''
      )}
      <div className="p-2 tickets my-3">
        <h2 className="mb-4">Open ticket(s)</h2>
        {openTickets.length > 0 ? (
          openTickets.map(tick => (
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AdminDashboard));
