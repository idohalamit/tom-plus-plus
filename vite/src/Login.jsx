import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [player1, setPlayer1] = useState('X');
  const [player2, setPlayer2] = useState('O');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Navigate to the game page and pass the player names as state
    navigate('/game', { state: { player1, player2 } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Player 1:
          <input
            type="text"
            value={player1}
            onChange={(e) => setPlayer1(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Player 2:
          <input
            type="text"
            value={player2}
            onChange={(e) => setPlayer2(e.target.value)}
            required
          />
        </label>
      </div>
      <button type="submit">Start Game</button>
    </form>
  );
}