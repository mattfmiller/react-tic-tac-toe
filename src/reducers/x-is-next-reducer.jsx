export default (state = true, action) => {
  switch (action.type) {
  case 'SWITCH_PLAYER':
  const { xIsNext } = action;
    return action.xIsNext;
  default:
    return state;
  }
};
