const clients = (state = [], action) => {
  switch (action.type) {
    case 'SET_CLIENTS':
      return action.clients;

    default:
      return state;
  }
};

export default clients;
