const openTickets = (state = [], action) => {
  switch (action.type) {
    case 'SET_OPEN_TICKETS':
      return action.openTickets;

    default:
      return state;
  }
};

export default openTickets;
