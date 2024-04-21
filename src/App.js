import { useState } from "react";

function Square({ value, onSquareClick }) {
  return ( 
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

// default function is equivalent to a sort of "main"
export default function Board() {
  const [isXNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const winner = isMatchOver(squares)
  let status
  if (winner) {
    status = "Winner: " + (isXNext ? "O" : "X")
  } else {
    status = "Next player: " + (isXNext ? "X" : "O")
  }

  function handleClick(i) {
    const newSquares = squares.slice();
    if (squares[i] != null || isMatchOver(newSquares)) return // if the square is already filled or a player won, return (do nothing)
    if (isXNext) { 
      newSquares[i] = "X";
    } else {
      newSquares[i] = "O";
    }
    setSquares(newSquares);
    setXIsNext(!isXNext);
  }

  return (
  <>
    <div className="status">{status}</div>
    <div className="board-row">
      <Square value={squares[0]} onSquareClick={() => handleClick(0)} /> {/* this is basically a constructor */}
      <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
      <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
    </div>
    <div className="board-row">
      <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
      <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
      <Square value={squares[5]} onSquareClick={() => handleClick(5)} />    
    </div>
    <div className="board-row">
      <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
      <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
      <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
    </div>
  </>
  );
}

function isMatchOver(squares) {
  const numRows = 3
  const numCols = 3
  const elementsOnDiag = 3
  for (let i = 0; i <= (numRows - 1) * numCols; i += numCols) {
    if (squares[i] != null && squares[i] === squares[i + 1] && squares[i] === squares[i + 2]) {
      return true
    }
  }
  for (let i = 0; i < numCols; i++) {
    if (squares[i] != null && squares[i] === squares[i + 3] && squares[i] === squares[i + 6]) {
      return true
    }
  }
  /* Elements on the main diagonal (going from top left to bottom right) 
     are at positions 0, 4, 8. The distance between them is numCols + 1.
     Elements on the secondary diagonal (going from top right to bottom left)
     are at positions 2, 4, 6. The distance between them is numCols - 1.
  */
  const stepsForDiag1 = numCols + 1
  const stepsForDiag2 = numCols - 1
  let firstDiagonalWins = false
  for (let i = 0; i < (elementsOnDiag - 1) * stepsForDiag1; i += stepsForDiag1) {
    firstDiagonalWins = squares[i] != null && squares[i] === squares[i + stepsForDiag1]
  }
  if (firstDiagonalWins) return true
  let secondDiagonalWins = false
  for (let i = stepsForDiag2; i < (elementsOnDiag - 1) * stepsForDiag2; i += stepsForDiag2) {
    secondDiagonalWins = squares[i] != null && squares[i] === squares[i + stepsForDiag2]
  }
  if (secondDiagonalWins) return true
  return false
}
