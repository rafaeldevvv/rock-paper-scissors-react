import { getRandomItem } from "./utilities.js";
const { useState } = React;

export default function Game({ gestures, onEnd }) {
  const [status, setStatus] = useState("picking");
  const [playerGesture, setPlayerGesture] = useState(null);
  const [houseGesture, setHouseGesture] = useState(null);

  function handlePick(pickedGesture) {
    setPlayerGesture(pickedGesture);
    setStatus("house_picking");

    setTimeout(() => {
      const newHouseGesture = getRandomItem(gestures);
      setHouseGesture(newHouseGesture);

      setTimeout(() => {
        let newStatus;
        if (pickedGesture.beats(newHouseGesture)) {
          newStatus = "won";
        } else if (newHouseGesture.beats(pickedGesture)) {
          newStatus = "lost";
        } else {
          newStatus = "tie";
        }

        onEnd(newStatus);
        setStatus(newStatus);
      }, 1000);
    }, 750);
  }

  function handlePlayAgain() {
    setHouseGesture(null);
    setPlayerGesture(null);
    setStatus("picking");
  }

  const isPicking = status === "picking";
  const isHousePicking = status === "house_picking";
  const isFinished = status === "lost" || status === "won" || status === "tie";

  return (
    <div className="game">
      {isPicking && <Pick gestures={gestures} onPick={handlePick} />}
      {isHousePicking && (
        <Choices playerGesture={playerGesture} houseGesture={houseGesture} />
      )}
      {isFinished && (
        <FinalScreen
          status={status}
          playerGesture={playerGesture}
          houseGesture={houseGesture}
          onPlayAgain={handlePlayAgain}
        />
      )}
    </div>
  );
}

function Pick({ gestures, onPick }) {
  return (
    <div className={gestures.length === 3 ? "original-pick" : "bonus-pick"}>
      {gestures.map((g) => (
        <Gesture gesture={g} onPick={onPick} key={g.id} />
      ))}
    </div>
  );
}

function Choices({ playerGesture, houseGesture }) {
  return (
    <div className="two-gesture-container">
      <Gesture gesture={playerGesture} />
      <p className="player-pick-message pick-message">You picked</p>
      <Gesture gesture={houseGesture} />
      <p className="house-pick-message pick-message">The house picked</p>
    </div>
  );
}

function FinalScreen({ status, playerGesture, houseGesture, onPlayAgain }) {
  let message;
  if (status === "won") {
    message = "You win";
  } else if (status === "lost") {
    message = "You lose";
  } else {
    message = status;
  }

  return (
    <div className="game-conclusion">
      <Gesture gesture={playerGesture} />
      <Gesture gesture={houseGesture} />
      <p className="player-pick-message pick-message">You picked</p>
      <p className="house-pick-message pick-message">The house picked</p>
      <div className="message-container">
        <p className="message">{message}</p>
        <button className="btn secondary-btn" onClick={onPlayAgain}>
          Play again
        </button>
      </div>
    </div>
  );
}

function Gesture({ gesture, onPick, highlight }) {
  if (!gesture) {
    return <div className="gesture empty"></div>;
  }

  return (
    <div
      className={"gesture " + gesture.name + (highlight ? "highlighted" : "")}
      onClick={() => {
        if (onPick) onPick(gesture);
      }}
    >
      <img src={`./images/icon-${gesture.name}.svg`} className="icon" />
    </div>
  );
}
