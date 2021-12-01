import React from "react";
import { Form } from "react-bootstrap";

/*
input param:
message: String, this will show as invalid message
return div of invalid message
*/
const InvalidFeedback = ({ message }) => {
  return (
    <Form.Control.Feedback type="invalid">
      {message}
      {/* <div className="invalid-feedback">{message}</div> */}
    </Form.Control.Feedback>
  );
};

export default InvalidFeedback;
