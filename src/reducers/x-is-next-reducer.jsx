export default (state = true, action) => {
  switch (action.type) {
  case 'SWITCH_PLAYER':
  const { xIsNext } = action;
    let newState = Object.assign({}, state, {
      xIsNext: xIsNext
    });
    return newState;
  default:
    return state;
  }
};
