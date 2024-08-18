import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Login';
import GamePage from './Game';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </Router>
  );
}