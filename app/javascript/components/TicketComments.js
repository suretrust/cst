import React from 'react';

const TicketComments = ({ comments }) => {
  return (
    <div>
      {comments.map(comment => (
        <div key={comment.id}>
          <p>
            {comment.user_email.split('@')[0].toUpperCase()}:{' '}
            <span>{comment.message}</span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default TicketComments;
