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
      if (operation === "add") {
        newScore = score + 1;
        return;
      } else if (operation === "subtract") {
        newScore = score - 1;
        return;
      } else if (operation === "multiply") {
        newScore = score * 2;
        return;
      } else if (operation === "divide") {
        newScore = score / 2;
        return;
      }

      opHandeler(name, newScore, steps + 1);
    }
  };
  const handleDeleteClick = () => {
    console.log("hi delete game.js");
    console.log(playerId);
    onDelete(playerId);
  };
  return (
    <div>
      <p>
        {" "}
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

          {/* <Button onClick={handleReset}>Restart</Button> */}
        </div>
      )}
    </div>
  );
};

export default Game;
