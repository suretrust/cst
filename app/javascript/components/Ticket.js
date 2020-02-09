import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { getTicket, getComments, closeTicket } from '../utilities/api';
import TicketComments from './TicketComments';
import { setTickets, setOpenTickets } from '../actions';
import CommentForm from './CommentForm';
import Layout from './Layout';

const mapStateToProps = state => ({
  tickets: state.tickets,
  openTickets: state.openTickets,
});

const mapDispatchToProps = dispatch => ({
  setTickets: tickets => dispatch(setTickets(tickets)),
  setOpenTickets: openTickets => dispatch(setOpenTickets(openTickets)),
});

const Ticket = ({ history, match, setTickets, setOpenTickets }) => {
  const [ticket, setTicket] = useState(null);
  const [comments, setComments] = useState(null);
  const [userType, setUserType] = useState(null);
  const [userId, setUserId] = useState(null);
  const [success, setSucess] = useState('');

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      history.push('/sign-in');
    } else {
      setUserType(jwtDecode(jwt).type);
      setUserId(jwtDecode(jwt).id);
      getTicket(setTicket, match.params.id);
      getComments(setComments);
    }
  }, []);

  const handleCloseTicket = e => {
    const id = e.target.id;
    closeTicket(id, userId, setOpenTickets, setTickets);
    setSucess('Ticket sucessfully closed!');
    setTimeout(() => {
      setSucess('');
    }, 1500);
    history.push('/');
  };

  return (
    <Layout>
      {success ? (
        <p className="alert alert-success text-center">{success}</p>
      ) : (
        ''
      )}
      <div className="p-2 tickets">
        <div className="shadow-sm p-3 mb-4 bg-light">
          <h2 className="text-info">
            {ticket ? ticket.title : ''} (
            {ticket && ticket.status ? 'OPEN' : 'CLOSED'})
          </h2>
          <p>{ticket ? ticket.message : ''}</p>
          <hr />
          <small className="font-italic">
            Opened {ticket && ticket.created_at} ago
          </small>
          {ticket &&
          (userType == 'Admin' || userType === 'Agent') &&
          ticket.status ? (
            <button
              type="submit"
              className="d-block mt-3 btn btn-sm btn-info"
              id={match.params.id}
              onClick={handleCloseTicket}
            >
              Close Ticket
            </button>
          ) : (
            ''
          )}
          <p>
            {ticket && !ticket.status ? (
              <small className="font-italic">
                Closed {ticket && ticket.updated_at} ago
              </small>
            ) : (
              ''
            )}
          </p>
        </div>

        {comments ? (
          <TicketComments
            comments={comments.filter(
              comment => comment.ticket_id === Number(match.params.id)
            )}
          />
        ) : (
          ''
        )}

        {(ticket && userType === 'Agent' && ticket.status) ||
        (ticket && userType === 'Admin' && ticket.status) ||
        (comments &&
          comments.filter(
            comment => comment.ticket_id === Number(match.params.id)
          ).length > 0 &&
          ticket &&
          ticket.status) ? (
          <CommentForm
            comments={comments}
            setComments={setComments}
            ticketId={match.params.id}
          />
        ) : (
          ''
        )}
      </div>
    </Layout>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Ticket));
