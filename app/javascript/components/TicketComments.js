import React from 'react';
import PropTypes, { object } from 'prop-types';

const TicketComments = ({ comments }) => {
  return (
    <div>
      <h4 className="ml-3 text-info">Comment(s)</h4>
      {comments.length > 0 ? (
        comments.map(comment => (
          <div className="shadow-sm p-3 mb-4 bg-light" key={comment.id}>
            <p className="font-italic">
              {comment.user_email.split('@')[0].toUpperCase()}:{' '}
              <span className="font-weight-normal">{comment.message}</span>
            </p>
          </div>
        ))
      ) : (
        <p className="shadow-sm p-3 mb-4 bg-light">
          There are no comments on this ticket.
        </p>
      )}
    </div>
  );
};

TicketComments.propTypes = {
  comments: PropTypes.arrayOf(object).isRequired,
};

export default TicketComments;
