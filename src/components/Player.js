// import React, { useState } from 'react';

// const Player = (props) => {
//   let initNumber = Math.floor(Math.random() * 100) + 1;
//   const [score, setScore] = useState(initNumber);
//   const [steps, setSteps] = useState(0);

//   const handlePlayerIncrement = () => {
//     const newScore = score + 1;
//     setScore(newScore);
//     setSteps(steps + 1);
//     props.handleIncrement(newScore, steps + 1, props.playerNumber);
//   };

//   return (
//     <div>
//       <h2>Player {props.playerNumber}</h2>
//       <p>Score: {score}</p>
//       <p>Steps: {steps}</p>
//       {!props.gameOver && <button onClick={handlePlayerIncrement}>Add 1</button>}
//     </div>
//   );
// };

// export default Player;


// // // ///////
import React, { useState } from 'react';

const Player = (props) => {
  const [score, setScore] = useState(0);
  const [steps, setSteps] = useState(0);

  const handlePlayerIncrement = (operation) => {
    let newScore;
    if (operation === 'add') {
      newScore = score + 1;
    } else if (operation === 'subtract') {
      newScore = score - 1;
    } else if (operation === 'multiply') {
      newScore = score * 2;
    } else if (operation === 'divide') {
      newScore = score / 2;
    }

    setScore(newScore);
    setSteps(steps + 1);
    props.handleIncrement(newScore, steps + 1, props.playerNumber);
  };

  return (
    <div>
      <h2>Player {props.playerNumber}</h2>
      <p>Score: {score}</p>
      <p>Steps: {steps}</p>
      {!props.gameOver && (
        <div>
          <button onClick={() => handlePlayerIncrement('add')}>Add 1</button>
          <button onClick={() => handlePlayerIncrement('subtract')}>
            Subtract 1
          </button>
          <button onClick={() => handlePlayerIncrement('multiply')}>
            Multiply by 2
          </button>
          <button onClick={() => handlePlayerIncrement('divide')}>
            Divide by 2
          </button>
        </div>
      )}
    </div>
  );
};

export default Player;

import React, { useState } from 'react';
import Player from './Player';

const App = () => {
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [player1Steps, setPlayer1Steps] = useState(0);
  const [player2Steps, setPlayer2Steps] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState('');

  const handleIncrement = (newScore, steps, playerNumber) => {
    if (playerNumber === 1) {
      setPlayer1Score(newScore);
      setPlayer1Steps(steps);
      if (newScore === 100) {
        setGameOver(true);
        setWinner('Player 1');
      }
    } else if (playerNumber === 2) {
      setPlayer2Score(newScore);
      setPlayer2Steps(steps);
      if (newScore === 100) {
        setGameOver(true);
        setWinner('Player 2');
      }
    }
  };

  const handleReset = () => {
    setPlayer1Score(0);
    setPlayer2Score(0);
    setPlayer1Steps(0);
    setPlayer2Steps(0);
    setGameOver(false);
    setWinner('');
  };

  return (
    <div>
      <h1>Game</h1>
      <Player
        playerNumber={1}
        handleIncrement={handleIncrement}
        gameOver={gameOver}
      />
      <Player
        playerNumber={2}
        handleIncrement={handleIncrement}
        gameOver={gameOver}
      />
      {gameOver && (
        <div>
          <p>{winner} won!</p>
          <button onClick={handleReset}>Play again</button>
        </div>
      )}
    </div>
  );
};

export default App;
