import React, { Fragment, useState } from "react";
import "./App.css";
import Game from "./components/Game";
import Button from "./UI/Button";
import Modal from "./UI/Modal";
import AddPlayer from "./components/AddPlayer";
import ErrorModal from "./components/Error/ErrorModal";
function App() {
  function randomNumber() {
    let initNumber = Math.floor(Math.random() * 100) + 1;
    return initNumber;
  }
  const [isShow, setIsShow] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(false);
  const [winner, setWinner] = useState("");
  const [numSteps, setNumSteps] = useState(0);

  const addPlayerHandler = (playerName) => {
    setPlayers((prevPlayers) => {
      return [
        ...prevPlayers,
        {
          id: prevPlayers.length + 1,
          name: playerName,
          score: randomNumber(),
          steps: 0,
          turn: players.length === 0 ? true : false,
        },
      ];
    });
  };

  const handleDelete = (playerId) => {
    console.log(playerId);

    setPlayers((prevPlayers) => {
      const updatedPlayer = prevPlayers.filter(
        (player) => player.id !== playerId
      );
      return updatedPlayer;
    });
    if (players.length === 1) {
      setIsShow(true);
    }
  };

  const opHandeler = (playerId, newScore, steps) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.id === playerId
          ? { ...player, score: newScore, steps: steps, turn: false }
          : { ...player, turn: true }
      )
    );

    const currentPlayer = players.find((player) => player.id === playerId);
    if (newScore === 100) {
      setGameOver(true);
      setWinner(currentPlayer.name);
      setNumSteps(steps);
    }
  };
  const startGame = () => {
    if (players.length >= 2) {
      setIsShow(false);
    } else {
      setError({
        title: "Invalid input!!",
        message: "Two players at least to start the game. ",
      });
    }
  };
  function newGameHandler() {
    setPlayers([]);
    setGameOver(false);
    setIsShow(true);
    setWinner("");
  }
  const errorHandler = () => {
    setError(null);
  };
  return (
    <Fragment>
      <h1>Get To 100</h1>
      {isShow && <AddPlayer onAdd={addPlayerHandler} />}

      {isShow && <Button onClick={startGame}>Start Playing</Button>}
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      {!isShow &&
        players.map((player) => (
          <Game
            key={player.id}
            playerId={player.id}
            name={player.name}
            score={player.score}
            steps={player.steps}
            turn={player.turn}
            opHandeler={opHandeler}
            gameOver={gameOver}
            onDelete={handleDelete}
          />
        ))}

      {gameOver && (
        <Modal>
          <h2>{winner} won!</h2>
          <p>Steps: {numSteps}</p>
          <Button onClick={newGameHandler}>Play Again</Button>
        </Modal>
      )}
    </Fragment>
  );
}

export default App;
