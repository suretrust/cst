import React, { useState } from 'react';
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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="message">Message</label>
        <input
          type="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Message"
          minLength="6"
          required
        />
      </div>
      <button type="submit">Add Comment</button>
    </form>
  );
};

export default CommentForm;
