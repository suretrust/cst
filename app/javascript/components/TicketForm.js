import React, { useState } from 'react';

const TicketForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    message: '',
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
  );
};

export default TicketForm;
