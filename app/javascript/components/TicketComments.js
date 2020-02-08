import React from 'react';

const TicketComments = ({ comments }) => {
  return (
    <div>
      {comments.map(comment => (
        <div className="shadow-sm p-3 mb-4 bg-light" key={comment.id}>
          <p className="font-italic">
            {comment.user_email.split('@')[0].toUpperCase()}:{' '}
            <span className="font-weight-normal">{comment.message}</span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default TicketComments;
