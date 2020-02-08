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
      setComments([...comments, res.data]);
    })
    .catch(err => {
      return err;
    });
};

const addTicket = async data => {
  await Axios.post('/api/v1/tickets', {
    user_id: data.userId,
    user_email: data.userEmail,
    title: data.title,
    message: data.message,
  })
    .then(res => {
      return res.data;
    })
    .catch(err => {
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

const closeTicket = async (id, userId) => {
  await Axios.put(`/api/v1/tickets/${id}`, { user_id: userId })
    .then(res => {
      return res.data;
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
  return user;
};

const getAgents = async (id, setAgents) => {
  await Axios.get('/api/v1/agents', { params: { user_id: id } })
    .then(res => {
      setAgents(res.data);
    })
    .catch(err => {
      return err;
    });
};

const getAdmins = async (id, setAdmins) => {
  await Axios.get('/api/v1/admins', { params: { user_id: id } })
    .then(res => {
      setAdmins(res.data);
    })
    .catch(err => {
      return err;
    });
};

const getClients = async (id, setClients) => {
  await Axios.get('/api/v1/clients', { params: { user_id: id } })
    .then(res => {
      setClients(res.data);
    })
    .catch(err => {
      return err;
    });
};

const getUserEmail = async (id, setUserEmailName) => {
  const user = await Axios.get(`/api/v1/users/${id}`)
    .then(res => {
      setUserEmailName(res.data.email.split('@')[0]);
    })
    .catch(err => {
      return err;
    });
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
  getAgents,
  getAdmins,
  getClients,
  getUserEmail,
  addComment,
  addTicket,
  closeTicket,
};
