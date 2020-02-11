const agents = (state = [], action) => {
  switch (action.type) {
    case 'SET_AGENTS':
      return action.agents;

    default:
      return state;
  }
};

export default agents;
