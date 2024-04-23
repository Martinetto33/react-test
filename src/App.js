import { useState } from "react";

function Square({ value, onSquareClick }) {
  return ( 
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}


function Board({ xIsNext, squares, onPlay }) {
  const winner = isMatchOver(squares)
  let status
  if (winner) {
    status = "Winner: " + (xIsNext ? "O" : "X")
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O")
  }

  function handleClick(i) {
    const newSquares = squares.slice();
    if (squares[i] != null || isMatchOver(newSquares)) return // if the square is already filled or a player won, return (do nothing)
    if (xIsNext) { 
      newSquares[i] = "X";
    } else {
      newSquares[i] = "O";
    }
    onPlay(newSquares)
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

// default function is equivalent to a sort of "main"; it tells
// the index.js file what is the top-level component
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  const xIsNext = (currentMove % 2) === 0
  const currentSquares = history[currentMove]

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares] /* ...history means 'enumerate all elements in history' 
    [this is called spread syntax], then append nextSquares */
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove)
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move
    } else {
      description = 'Go to game start'
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
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
