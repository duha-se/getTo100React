import React, { Fragment } from "react";
import classes from "./Modal.module.css";
import * as ReactDOM from "react-dom";
const Backdrop = (props) => {
  return <div className={classes.backdrop} />;
};
const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};
const portalElement = document.getElementById("overlays");
export default function Modal(props) {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
}
