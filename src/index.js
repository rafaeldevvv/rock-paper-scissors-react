import {
  getScore,
  checkIsOriginalGame,
  getRightGestures,
} from "./utilities.js";
import showRules from "./showRules.js";
import Game from "./Game.js";
const { useState } = React;
const { createRoot } = ReactDOM;

function App() {
  const [score, setScore] = useState(getScore() || 0);
  const [gestures, setGestures] = useState(getRightGestures());
  const [isOriginalGame, setIsOriginalGame] = useState(checkIsOriginalGame());

  function handleEndGame(status) {
    if (status === "won") {
      const nextScore = score + 1;
      setScore(nextScore);
      localStorage.setItem("score", nextScore);
    } else if (status === "lost") {
      const nextScore = Math.max(score - 1, 0);
      setScore(nextScore);
      localStorage.setItem("score", nextScore);
    }
  }

  function handleChangeGame() {
    setIsOriginalGame(!isOriginalGame);
    localStorage.setItem("isOriginalGame", !isOriginalGame);
    setGestures(getRightGestures());
  }

  return (
    <div id="wrapper">
      <Header score={score} isOriginalGame={isOriginalGame} />
      <Game gestures={gestures} onEnd={handleEndGame} />
      <BottomButtons
        onShowRules={() => showRules(isOriginalGame)}
        onChangeGame={handleChangeGame}
      />
      <Footer />
    </div>
  );
}

function Header({ score, isOriginalGame }) {
  const logoUrl = isOriginalGame
    ? "./images/logo.svg"
    : "./images/logo-bonus.svg";

  return (
    <header>
      <img src={logoUrl} />
      <div className="score-container">
        <span className="text">Score</span>
        <span className="score">{score}</span>
      </div>
    </header>
  );
}

function BottomButtons({ onChangeGame, onShowRules }) {
  return (
    <div className="buttons">
      <button className="btn primary-btn" onClick={onShowRules}>
        Rules
      </button>
      <button className="btn primary-btn" onClick={onChangeGame}>
        <i className="fa-solid fa-repeat"></i> original/bonus
      </button>
    </div>
  );
}

function Footer() {
  return (
    <footer>
      Challenge by <a href="https://www.frontendmentor/">Front End Mentor</a>.
      Coded by <a href="https://github.com/rafaeldevvv">Rafael Maia</a>
    </footer>
  );
}

createRoot(document.querySelector("#root")).render(<App />);
