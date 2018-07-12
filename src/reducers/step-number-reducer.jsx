export default (state = 0, action) => {
  switch (action.type) {
  case 'RECORD_TURN':
  const { turn } = action;
    let newState = Object.assign({}, state, {
      stepNumber: turn
    });
    return newState;
  default:
    return state;
  }
};
