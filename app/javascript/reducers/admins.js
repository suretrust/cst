const admins = (state = [], action) => {
  switch (action.type) {
    case 'SET_ADMINS':
      return action.admins;

    default:
      return state;
  }
};

export default admins;
