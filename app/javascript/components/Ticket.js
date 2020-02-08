import React, { useEffect, useState } from 'react';
import { getTicket, getComments } from '../utilities/api';
import TicketComments from './TicketComments';
import CommentForm from './CommentForm';
import Layout from './Layout';

const Ticket = ({ history, match }) => {
  const [ticket, setTicket] = useState(null);
  const [comments, setComments] = useState(null);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      history.push('/sign-in');
    } else {
      getTicket(setTicket, match.params.id);
      getComments(setComments);
    }
  }, []);

  return (
    <Layout>
      <h2>
        {ticket ? ticket.title : ''} (
        {ticket && ticket.status ? 'OPEN' : 'CLOSED'})
      </h2>
      <p>{ticket ? ticket.message : ''}</p>
      <p>Opened: {ticket ? Date(ticket.created_at).split('GMT')[0] : ''}</p>
      <p>
        {ticket && !ticket.status
          ? `Closed: ${Date(ticket.updated_at).split('GMT')[0]}`
          : ''}
      </p>
      {comments &&
      comments.filter(comment => comment.ticket_id === Number(match.params.id))
        .length > 0 &&
      ticket &&
      ticket.status ? (
        <CommentForm
          comments={comments}
          setComments={setComments}
          ticketId={match.params.id}
        />
      ) : (
        ''
      )}
      {comments ? (
        <TicketComments
          comments={comments.filter(
            comment => comment.ticket_id === Number(match.params.id)
          )}
        />
      ) : (
        ''
      )}
    </Layout>
  );
};

export default Ticket;
