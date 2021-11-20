import React, { useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
// import "../stylesheets/toastMessage.css";

const ToastMessage = ({ show, message, setMessage, type, delay }) => {
  const styles = {
    successIcon: {
      color: "rgb(62, 207, 62)",
      fontSize: "1.5em",
    },
    infoIcon: {
      color: "rgb(0, 150, 200)",
      fontSize: "1.5em",
    },
  };

  let [showToast, setShowToast] = useState(show);

  const renderIcon = () => {
    if (type === "Success") {
      return <FontAwesomeIcon icon={faCheckSquare} style={styles[`${type.toLowerCase()}Icon`]} />;
    } else if (type === "Info") {
      return <FontAwesomeIcon icon={faInfoCircle} style={styles[`${type.toLowerCase()}Icon`]} />;
    } else {
      return <FontAwesomeIcon icon={faCheckSquare} style={styles[`${type.toLowerCase()}Icon`]} />;
    }
  };

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
          {renderIcon()}
          {/* <FontAwesomeIcon icon={}/> */}
          {/* <i className="fas fa-check-square" style={styles[`${type.toLowerCase()}Icon`]}></i> */}
          <strong className="me-auto ms-2">{type || "Success"}</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastMessage;
