import React, { useState } from 'react';
import jwtDecode from 'jwt-decode';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { setTickets } from '../actions';
import Layout from './Layout';
import { addTicket } from '../utilities/api';

const mapStateToProps = state => ({
  tickets: state.tickets,
});

const mapDispatchToProps = dispatch => ({
  setTickets: tickets => dispatch(setTickets(tickets)),
});

const TicketForm = ({ history, tickets, setTickets }) => {
  const jwt = localStorage.getItem('jwt');
  const userId = Number(jwtDecode(jwt).id);
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
    addTicket(formData, setTickets, tickets);
    history.push('/dashboard');
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <h2 className="mb-4">Create a new ticket</h2>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="form-control mb-4"
            minLength="6"
            required
          />
        </div>
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
          Create Ticket
        </button>
      </form>
    </Layout>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TicketForm));
