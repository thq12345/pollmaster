import React, { useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faInfoCircle, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import "../stylesheets/toastMessage.css";
import PropTypes from "prop-types";

const ToastMessage = ({ show, message, setMessage, type, delay }) => {
  const generateIcon = (type) => {
    if (type === "Info") {
      return faInfoCircle;
    } else if (type === "Error") {
      return faExclamationTriangle;
    } else {
      return faCheckSquare;
    }
  };

  let [showToast, setShowToast] = useState(show);

  const renderIcon = () => {
    return <FontAwesomeIcon icon={generateIcon(type)} className={`icon ${type.toLowerCase()}`} />;
  };

  return (
    <ToastContainer className="ToastMessage p-5" position="top-end">
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
          <strong className="me-auto ms-2">{type || "Success"}</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

ToastMessage.propTypes = {
  show: PropTypes.bool,
  message: PropTypes.string,
  setMessage: PropTypes.func,
  type: PropTypes.string,
  delay: PropTypes.number,
};

export default ToastMessage;
