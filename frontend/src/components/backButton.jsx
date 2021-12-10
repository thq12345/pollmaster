import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "@restart/ui/esm/Button";
import useRedirect from "../hooks/useRedirect";

const BackButton = ({ to, type, onRedirect }) => {
  let redirect = useRedirect();
  let navigate = useNavigate();

  return (
    <Button
      onClick={() => {
        if (onRedirect) onRedirect();

        if (window.history.state.usr && window.history.state.usr.backUrl) {
          redirect();
        } else {
          navigate(to);
        }
      }}
      className={type ? `btn btn-${type}` : "btn btn-primary"}
    >
      <FontAwesomeIcon icon={faArrowLeft} /> Back
    </Button>
  );
};

BackButton.propTypes = {
  to: PropTypes.string,
  type: PropTypes.string,
  onRedirect: PropTypes.func,
};

export default BackButton;
