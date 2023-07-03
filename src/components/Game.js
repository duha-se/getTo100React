import React from "react";
import Button from "../UI/Button";
import "./Game.css";

const Game = ({
  name,
  score,
  steps,
  opHandeler,
  gameOver,
  onDelete,
  playerId,
  turn,
}) => {
  const operationHandeler = (operation) => {
    let newScore;
    if (turn && !gameOver) {
      switch (operation) {
        case "add":
          newScore = score + 1;
          steps += 1;
          break;
        case "subtract":
          newScore = score - 1;
          steps += 1;
          break;
        case "multiply":
          newScore = score * 2;
          steps += 1;
          break;
        case "divide":
          newScore = score / 2;
          steps += 1;
          break;
        default:
          break;
      }

      opHandeler(playerId, newScore, steps);
    }
  };
  const handleDeleteClick = () => {
    onDelete(playerId);
  };
  return (
    <div>
      <p>
        Player {playerId} Name : {name}
      </p>
      <label>Score : {score}</label>
      <br /> <br />
      <div className="divStyle"> {steps} Steps </div>
      <br />
      <br />
      {!gameOver && (
        <div>
          <Button
            onClick={() => operationHandeler("add")}
            disabled={!turn || gameOver}
          >
            +1
          </Button>
          <Button
            onClick={() => operationHandeler("subtract")}
            disabled={!turn || gameOver}
          >
            -1
          </Button>
          <Button
            onClick={() => operationHandeler("multiply")}
            disabled={!turn || gameOver}
          >
            *2
          </Button>
          <Button
            onClick={() => operationHandeler("divide")}
            disabled={!turn || gameOver}
          >
            ÷2
          </Button>
          <Button onClick={handleDeleteClick}>Quit</Button>
        </div>
      )}
    </div>
  );
};

export default Game;
