export default (state = {
      0: {
        squares: Array(9).fill(null),
      }
    }, action) => {
  switch (action.type) {
  case 'MARK_BOX':
    const { i, turn, player } = action;
    const current = Object.assign({}, state[turn - 1]);
    let newBoard = current.squares.slice();
    newBoard[i] = player;
      let newState = Object.assign({}, state, {
        [turn]: {
          squares: newBoard
        }
      });
    return newState;
  default:
    return state;
  }
};
