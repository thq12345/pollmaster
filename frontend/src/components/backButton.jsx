import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const BackButton = ({ to, type, onRedirect }) => {
  return (
    <Link to={to} onClick={onRedirect} className={type ? `btn btn-${type}` : "btn btn-primary"}>
      <FontAwesomeIcon icon={faArrowLeft} /> Back
    </Link>
  );
};

BackButton.propTypes = {
  to: PropTypes.string,
  type: PropTypes.string,
  onRedirect: PropTypes.func,
};

export default BackButton;
