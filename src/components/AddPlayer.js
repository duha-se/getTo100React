import React, { useRef, useState } from "react";
import Button from "../UI/Button";
import ErrorModal from "./Error/ErrorModal";
export default function AddPlayer(props) {
  const nameInputRef = useRef();
  const [error, setError] = useState();
  const addPlayer = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;

    if (enteredName.trim().length === 0) {
      setError({
        title: "Invalid input!!",
        message: "Please enter your name ",
      });
      return;
    }
    props.onAdd(enteredName);
    nameInputRef.current.value = "";
  };
  const errorHandler = () => {
    setError(null);
  };
  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <input ref={nameInputRef} placeholder="Your Name" type="text" required />
      &nbsp;
      <Button onClick={addPlayer}>Add Player</Button>
    </div>
  );
}
