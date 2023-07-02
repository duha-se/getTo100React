import React from "react";
import Button from "../../UI/Button";
import classes from "./ErrorModal.module.css";

const ErrorModal = (props) => {
  return (
    <React.Fragment>
      <div className={classes.backdrop} onClick={props.onConfirm} />
      <div className={classes.modal}>
        <header className={classes.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={classes.content}>
          <p>{props.message}</p>
        </div>
        <footer className={classes.actions}>
          <Button onClick={props.onConfirm}>Okay</Button>
        </footer>
      </div>
    </React.Fragment>
  );
};

export default ErrorModal;
