import React from "react";
import { Spinner } from "react-bootstrap";
import PropTypes from "prop-types";
import "../stylesheets/loader.css";

const Loader = ({ variant }) => {
  return <Spinner className="Loader" animation="border" variant={variant} />;
};

Loader.propTypes = {
  variant: PropTypes.string,
};

export default Loader;
