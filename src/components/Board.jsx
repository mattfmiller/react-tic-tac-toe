import React from 'react';
import '../index.css';
import Square from './Square';

function Board(props) {

  function renderSquare(i) {
    return (
      <Square
        value={props.squares[i]}
        i={i}
      />
    );
  }


  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}


export default Board;
