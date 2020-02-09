import React, { useState } from 'react';
import PropTypes, { object } from 'prop-types';
import jwtDecode from 'jwt-decode';
import { addComment } from '../utilities/api';

const CommentForm = ({ ticketId, setComments, comments }) => {
  const jwt = localStorage.getItem('jwt');
  const userId = jwtDecode(jwt).id;
  const userEmail = jwtDecode(jwt).email;

  const [formData, setFormData] = useState({
    message: '',
    ticketId,
    userEmail,
    userId,
  });

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    addComment(setComments, comments, formData);
    setFormData({ ...formData, message: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <div>
        <label htmlFor="message">Message</label>
        <textarea
          type="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Message"
          className="form-control mb-4"
          minLength="6"
          required
        />
      </div>
      <button type="submit" className="btn btn-info mb-5">
        Add Comment
      </button>
    </form>
  );
};

CommentForm.propTypes = {
  ticketId: PropTypes.string.isRequired,
  setComments: PropTypes.func.isRequired,
  comments: PropTypes.arrayOf(object),
};

export default CommentForm;
