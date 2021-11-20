import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const BackButton = ({ to, type, onRedirect }) => {
  return (
    <Link to={to} onClick={onRedirect} className={type ? `btn btn-${type}` : "btn btn-primary"}>
      <FontAwesomeIcon icon={faArrowLeft} /> Back
    </Link>
  );
};

export default BackButton;
