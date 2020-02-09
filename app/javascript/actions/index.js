const setComments = comments => ({
  type: 'SET_COMMENTS',
  comments,
});

const setTickets = tickets => ({
  type: 'SET_TICKETS',
  tickets,
});

export { setComments, setTickets };
