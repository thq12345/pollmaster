import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
// import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "@restart/ui/esm/Button";
import useRedirect from "../hooks/useRedirect";

const BackButton = ({ type, onRedirect }) => {
  let redirect = useRedirect();

  return (
    <Button
      onClick={() => {
        if (onRedirect) onRedirect();
        redirect();
      }}
      className={type ? `btn btn-${type}` : "btn btn-primary"}
    >
      <FontAwesomeIcon icon={faArrowLeft} /> Back
    </Button>
  );
};

BackButton.propTypes = {
  // to: PropTypes.string,
  type: PropTypes.string,
  onRedirect: PropTypes.func,
};

export default BackButton;
