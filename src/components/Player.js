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
// import React, { useState } from 'react';

// const Player = (props) => {
//   const [score, setScore] = useState(0);
//   const [steps, setSteps] = useState(0);

//   const handlePlayerIncrement = (operation) => {
//     let newScore;
//     if (operation === 'add') {
//       newScore = score + 1;
//     } else if (operation === 'subtract') {
//       newScore = score - 1;
//     } else if (operation === 'multiply') {
//       newScore = score * 2;
//     } else if (operation === 'divide') {
//       newScore = score / 2;
//     }

//     setScore(newScore);
//     setSteps(steps + 1);
//     props.handleIncrement(newScore, steps + 1, props.playerNumber);
//   };

//   return (
//     <div>
//       <h2>Player {props.playerNumber}</h2>
//       <p>Score: {score}</p>
//       <p>Steps: {steps}</p>
//       {!props.gameOver && (
//         <div>
//           <button onClick={() => handlePlayerIncrement('add')}>Add 1</button>
//           <button onClick={() => handlePlayerIncrement('subtract')}>
//             Subtract 1
//           </button>
//           <button onClick={() => handlePlayerIncrement('multiply')}>
//             Multiply by 2
//           </button>
//           <button onClick={() => handlePlayerIncrement('divide')}>
//             Divide by 2
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Player;

// import React, { useState } from 'react';
// import Player from './Player';

// const App = () => {
//   const [player1Score, setPlayer1Score] = useState(0);
//   const [player2Score, setPlayer2Score] = useState(0);
//   const [player1Steps, setPlayer1Steps] = useState(0);
//   const [player2Steps, setPlayer2Steps] = useState(0);
//   const [gameOver, setGameOver] = useState(false);
//   const [winner, setWinner] = useState('');

//   const handleIncrement = (newScore, steps, playerNumber) => {
//     if (playerNumber === 1) {
//       setPlayer1Score(newScore);
//       setPlayer1Steps(steps);
//       if (newScore === 100) {
//         setGameOver(true);
//         setWinner('Player 1');
//       }
//     } else if (playerNumber === 2) {
//       setPlayer2Score(newScore);
//       setPlayer2Steps(steps);
//       if (newScore === 100) {
//         setGameOver(true);
//         setWinner('Player 2');
//       }
//     }
//   };

//   const handleReset = () => {
//     setPlayer1Score(0);
//     setPlayer2Score(0);
//     setPlayer1Steps(0);
//     setPlayer2Steps(0);
//     setGameOver(false);
//     setWinner('');
//   };

//   return (
//     <div>
//       <h1>Game</h1>
//       <Player
//         playerNumber={1}
//         handleIncrement={handleIncrement}
//         gameOver={gameOver}
//       />
//       <Player
//         playerNumber={2}
//         handleIncrement={handleIncrement}
//         gameOver={gameOver}
//       />
//       {gameOver && (
//         <div>
//           <p>{winner} won!</p>
//           <button onClick={handleReset}>Play again</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;
//----------------------------------------------------------
import React, { useState } from "react";
import Player from "./Player";
import ModalOverlay from "./ModalOverlay";
import Backdrop from "./Backdrop";

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const App = () => {
  const [players, setPlayers] = useState([
    { id: 1, score: getRandomNumber(1, 100), steps: 0, turn: true },
    { id: 2, score: getRandomNumber(1, 100), steps: 0, turn: false },
  ]);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleIncrement = (newScore, steps, playerId) => {
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
      setWinner(`Player ${currentPlayer.id}`);
      setShowModal(true);
    }
  };

  const handleDelete = (playerId) => {
    setPlayers((prevPlayers) =>
      prevPlayers.filter((player) => player.id !== playerId)
    );
  };

  const handleReset = () => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) => ({
        ...player,
        score: getRandomNumber(1, 100),
        steps: 0,
        turn: player.id === 1 ? true : false,
      }))
    );
    setGameOver(false);
    setWinner("");
    setShowModal(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <h1>Game</h1>
      {players.map((player) => (
        <Player
          key={player.id}
          playerId={player.id}
          initialScore={player.score}
          handleIncrement={handleIncrement}
          handleDelete={handleDelete}
          turn={player.turn}
          gameOver={gameOver}
        />
      ))}
      {showModal && (
        <React.Fragment>
          <ModalOverlay
            winner={winner}
            steps={
              players.find(
                (player) => player.id === Number(winner.split(" ")[1])
              ).steps
            }
            handleReset={handleReset}
            onClick={closeModal}
          />
          <Backdrop onClick={closeModal} />
        </React.Fragment>
      )}
    </div>
  );
};

export default App;
///
import React from 'react';

const Player = (props) => {
  const { playerId, initialScore, handleIncrement, handleDelete, turn, gameOver } = props;

  const handleClick = (operation) => {
    if (turn && !gameOver) {
      let newScore = initialScore;
      let steps = props.steps;
      
      switch (operation) {
        case 'add':
          newScore += 1;
          steps += 1;
          break;
        case 'subtract':
          newScore -= 1;
          steps += 1;
          break;
        case 'multiply':
          newScore *= 2;
          steps += 1;
          break;
        case 'divide':
          newScore /= 2;
          steps += 1;
          break;
        default:
          break;
      }

      handleIncrement(newScore, steps, playerId);
    }
  };

  const handleDeleteClick = () => {
    handleDelete(playerId);
  };

  return (
    <div>
      <h2>Player {playerId}</h2>
      <p>Score: {initialScore}</p>
      <button onClick={() => handleClick('add')} disabled={!turn || gameOver}>
        Add 1
      </button>
      <button onClick={() => handleClick('subtract')} disabled={!turn || gameOver}>
        Subtract 1
      </button>
      <button onClick={() => handleClick('multiply')} disabled={!turn || gameOver}>
        Multiply by 2
      </button>
      <button onClick={() => handleClick('divide')} disabled={!turn || gameOver}>
        Divide by 2
      </button>
      <button onClick={handleDeleteClick}>Delete</button>
    </div>
  );
};

export default Player;
///////////
import React, { useState } from 'react';
import Player from './Player';
import ModalOverlay from './ModalOverlay';
import Backdrop from './Backdrop';

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const App = () => {
  const [players, setPlayers] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleAddPlayer = () => {
    const newPlayer = {
      id: players.length + 1,
      score: getRandomNumber(1, 100),
      steps: 0,
      turn: players.length === 0 ? true : false
    };

    setPlayers(prevPlayers => [...prevPlayers, newPlayer]);
  };

  const handleIncrement = (newScore, steps, playerId) => {
    setPlayers(prevPlayers =>
      prevPlayers.map(player =>
        player.id === playerId
          ? { ...player, score: newScore, steps: steps, turn: false }
          : { ...player, turn: true }
      )
    );

    const currentPlayer = players.find(player => player.id === playerId);
    if (newScore === 100) {
      setGameOver(true);
      setWinner(`Player ${currentPlayer.id}`);
      setShowModal(true);
    }
  };

  const handleDelete = (playerId) => {
    setPlayers(prevPlayers =>
      prevPlayers.filter(player => player.id !== playerId)
    );
  };

  const handleReset = () => {
    setPlayers([]);
    setGameOver(false);
    setWinner('');
    setShowModal(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <h1>Game</h1>
      <button onClick={handleAddPlayer}>Add Player</button>
      {players.map(player => (
        <Player
          key={player.id}
          playerId={player.id}
          initialScore={player.score}
          handleIncrement={handleIncrement}
          handleDelete={handleDelete}
          turn={player.turn}
          gameOver={gameOver}
        />
      ))}
      {showModal && (
        <React.Fragment>
          <ModalOverlay
            winner={winner}
            steps={players.find(player => player.id === Number(winner.split(' ')[1])).steps}
            handleReset={handleReset}
            onClick={closeModal}
          />
          <Backdrop onClick={closeModal} />
        </React.Fragment>
      )}
    </div>
  );
};

export default App;
