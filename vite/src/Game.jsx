import { useLocation } from 'react-router-dom';
import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function PlayerBoard({ player, currentPlayer, squares, onPlay }) {

  function handleClick(i, enable) {
    if (!enable || squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = currentPlayer;
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + currentPlayer;
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0, player === currentPlayer)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1, player === currentPlayer)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2, player === currentPlayer)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3, player === currentPlayer)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4, player === currentPlayer)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5, player === currentPlayer)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6, player === currentPlayer)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7, player === currentPlayer)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8, player === currentPlayer)} />
      </div>
    </>
  );
}

function RestartButton() {
    return <div>Restart</div>
}

export default function GamePage() {
  const location = useLocation();
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const { player1, player2 } = location.state || { player1: 'X', player2: 'O' };  
  const currentSquares = history[currentMove];
  const isXTurn = currentMove % 2 == 0;

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-boards">
        <div className="player-name">{player1}'s board</div>
        <PlayerBoard player="X" currentPlayer={isXTurn ? "X" : "O"} squares={currentSquares} onPlay={handlePlay} />
        <br></br>
        <div className="player-name">{player2}'s board</div>
        <PlayerBoard player="O" currentPlayer={isXTurn ? "X" : "O"} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
      {calculateWinner(currentSquares) !== null ? <RestartButton /> : null}
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}