import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import { connect } from 'react-redux';

function Square(props) {

  function handleClick() {
    const { dispatch } = props;
    // const history = props.history.slice(0, props.stepNumber + 1);
    const current = props.history[props.stepNumber];
    const squares = current.squares;
    if (calculateWinner(squares) || squares[props.i]) {
      return;
    }
    let player = 'X';
    if (!props.xIsNext) {
      player = 'O';
    }

    const action1 = {
      type: 'MARK_BOX',
      i: props.i,
      turn: props.stepNumber + 1,
      player: player
    };
    dispatch(action1);

    const action2 = {
      type: 'RECORD_TURN',
      turn: props.stepNumber + 1
    };
    dispatch(action2);

    const action3 = {
      type: 'SWITCH_PLAYER',
      xIsNext: !props.xIsNext
    };
    dispatch(action3);
  }

  return (
    <button className="square" onClick={handleClick}>
      {props.value}
    </button>
  );
}

const mapStateToProps = state => {
  return {
    history: state.history,
    stepNumber: state.stepNumber,
    xIsNext: state.xIsNext
  };
};

export default connect(mapStateToProps)(Square);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
