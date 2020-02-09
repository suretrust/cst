const setComments = comments => ({
  type: 'SET_COMMENTS',
  comments,
});

const setTickets = tickets => ({
  type: 'SET_TICKETS',
  tickets,
});

const setOpenTickets = openTickets => ({
  type: 'SET_OPEN_TICKETS',
  openTickets,
});

const setClients = clients => ({
  type: 'SET_CLIENTS',
  clients,
});

const setAgents = agents => ({
  type: 'SET_AGENTS',
  agents,
});

const setAdmins = admins => ({
  type: 'SET_ADMINS',
  admins,
});

export {
  setComments,
  setTickets,
  setOpenTickets,
  setClients,
  setAgents,
  setAdmins,
};
