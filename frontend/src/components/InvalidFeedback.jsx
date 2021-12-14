import React from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

/*
input param:
message: String, this will show as invalid message
return div of invalid message
*/
const InvalidFeedback = ({ message }) => {
  return <Form.Control.Feedback type="invalid">{message}</Form.Control.Feedback>;
};

InvalidFeedback.propTypes = {
  message: PropTypes.string.isRequired,
};

export default InvalidFeedback;
