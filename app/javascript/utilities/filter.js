const filter = (tickets, id) => {
  return tickets.filter(ticket => ticket.user_id === id);
};

export default filter;
