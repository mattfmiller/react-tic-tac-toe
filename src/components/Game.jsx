import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import Board from './Board';
import { connect } from 'react-redux';

class Game extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     history: [{
  //       squares: Array(9).fill(null),
  //     }],
  //     stepNumber: 0,
  //     xIsNext: true,
  //   };
  // }

  // handleClick(i) {
  //   const history = this.state.history.slice(0, this.state.stepNumber + 1);
  //   const current = history[history.length - 1];
  //   const squares = current.squares.slice();
  //   if (calculateWinner(squares) || squares[i]) {
  //     return;
  //   }
  //   squares[i] = this.state.xIsNext ? 'X' : 'O';
  //   this.setState({
  //     history: history.concat([{
  //       squares: squares,
  //     }]),
  //     stepNumber: history.length,
  //     xIsNext: !this.state.xIsNext,
  //   });
  // }

  jumpTo(step) {
    const {dispatch} = this.props;
    let action = {
      type: 'RECORD_TURN',
      turn: step,
    }
      dispatch(action);
    const action3 = {
      type: 'SWITCH_PLAYER',
      xIsNext: !this.props.xIsNext
    };
    dispatch(action3);
  }

  render() {
    // console.log(this.props.currentState);
    // const history = this.props.history;
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
    // currentState: state,
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
