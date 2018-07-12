import React from 'react';
import '../index.css';
import Board from './Board';
import { connect } from 'react-redux';

class Game extends React.Component {

  jumpTo(step) {
    const {dispatch} = this.props;
    let action = {
      type: 'RECORD_TURN',
      turn: parseInt(step),
    }
      dispatch(action);
    const action3 = {
      type: 'SWITCH_PLAYER',
      xIsNext: !this.props.xIsNext
    };
    dispatch(action3);
  }

  render() {
    const current = this.props.history[this.props.stepNumber];
    console.log(this.props.history);
    console.log(this.props.stepNumber);
    console.log(current);
    console.log(current.squares);
    const winner = calculateWinner(current.squares);

    const moves = Object.keys(this.props.history).map(move => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.props.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            // onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{ moves }</ol>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    history: state.history,
    stepNumber: state.stepNumber,
    xIsNext: state.xIsNext
  };
};

export default connect(mapStateToProps)(Game);

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
