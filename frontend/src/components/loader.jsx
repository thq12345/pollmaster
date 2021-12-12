import React from "react";
import { Spinner } from "react-bootstrap";
import PropTypes from "prop-types";
import "../stylesheets/loader.css";

const Loader = () => {
  return <Spinner className="Loader" animation="border" />;
};

Loader.propTypes = {
  variant: PropTypes.string,
};

export default Loader;
