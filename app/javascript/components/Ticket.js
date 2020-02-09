import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { getTicket, getComments } from '../utilities/api';
import TicketComments from './TicketComments';
import CommentForm from './CommentForm';
import Layout from './Layout';

const Ticket = ({ history, match }) => {
  const [ticket, setTicket] = useState(null);
  const [comments, setComments] = useState(null);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      history.push('/sign-in');
    } else {
      setUserType(jwtDecode(jwt).type);
      getTicket(setTicket, match.params.id);
      getComments(setComments);
    }
  }, []);

  return (
    <Layout>
      <div className="p-2 tickets">
        <div className="shadow-sm p-3 mb-4 bg-light">
          <h2 className="text-info">
            {ticket ? ticket.title : ''} (
            {ticket && ticket.status ? 'OPEN' : 'CLOSED'})
          </h2>
          <p>{ticket ? ticket.message : ''}</p>
          <hr />
          <small>
            Opened:{' '}
            <span className="font-italic">
              {ticket ? Date(ticket.created_at).split('GMT')[0] : ''}
            </span>
          </small>
          <p>
            {ticket && !ticket.status ? (
              <small>
                Closed:{' '}
                <span className="font-italic">
                  {Date(ticket.updated_at).split('GMT')[0]}
                </span>
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

export default Ticket;