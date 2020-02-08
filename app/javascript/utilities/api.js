import jwtDecode from 'jwt-decode';
import Axios from 'axios';

const getTickets = async setTickets => {
  await Axios.get('/api/v1/tickets')
    .then(res => {
      setTickets(res.data);
    })
    .catch(err => {
      return err;
    });
};

const addComment = async (setComments, comments, data) => {
  await Axios.post('/api/v1/comments', {
    user_id: data.userId,
    ticket_id: data.ticketId,
    user_email: data.userEmail,
    message: data.message,
  })
    .then(res => {
      console.log(res.data);
      setComments([...comments, res.data]);
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

const getTicket = async (setTicket, id) => {
  await Axios.get(`/api/v1/tickets/${id}`)
    .then(res => {
      setTicket(res.data);
    })
    .catch(err => {
      return err;
    });
};

const getUser = async id => {
  const user = await Axios.get(`/api/v1/users/${id}`)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return err;
    });
  console.log(user);
  return user;
};

const getUserEmail = async (id, setUserEmailName) => {
  const user = await Axios.get(`/api/v1/users/${id}`)
    .then(res => {
      setUserEmailName(res.data.email.split('@')[0]);
    })
    .catch(err => {
      return err;
    });
  console.log(user);
  return user;
};

const getComments = async setComments => {
  await Axios.get('/api/v1/comments')
    .then(res => {
      setComments(res.data);
    })
    .catch(err => {
      return err;
    });
};

export {
  getTickets,
  getTicket,
  getComments,
  getUser,
  getUserEmail,
  addComment,
};
