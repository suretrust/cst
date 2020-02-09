const tickets = (state = [], action) => {
  switch (action.type) {
    case 'SET_TICKETS':
      return action.tickets;

    default:
      return state;
  }
};

export default tickets;
