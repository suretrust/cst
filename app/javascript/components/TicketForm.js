import React, { useState } from 'react';
import jwtDecode from 'jwt-decode';
import Layout from './Layout';

const TicketForm = () => {
  const jwt = localStorage.getItem('jwt');
  const userId = jwtDecode(jwt).id;
  const userEmail = jwtDecode(jwt).email;

  const [formData, setFormData] = useState({
    title: '',
    message: '',
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
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            minLength="6"
            required
          />
        </div>
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
        <button type="submit">Create Ticket</button>
      </form>
    </Layout>
  );
};

export default TicketForm;
