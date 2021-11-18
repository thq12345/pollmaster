import React, { useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
// import "../stylesheets/toastMessage.css";

const ToastMessage = ({ show, message, setMessage, type, delay }) => {
  const styles = {
    successIcon: {
      color: "rgb(62, 207, 62)",
      fontSize: "1.5em",
    },
  };

  let [showToast, setShowToast] = useState(show);

  return (
    <ToastContainer className="p-4" position="bottom-start">
      <Toast
        onClose={() => {
          setShowToast(false);
          setMessage(null);
        }}
        show={showToast}
        delay={delay || 3000}
        autohide
      >
        <Toast.Header>
          <i className="fas fa-check-square" style={styles.successIcon}></i>
          <strong className="me-auto ms-2">{type || "Success"}</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastMessage;
