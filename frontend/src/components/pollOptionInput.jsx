import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import "../stylesheets/pollOptionInput.css";
import PropTypes from "prop-types";

const PollOptionInput = ({ defaultValue, onOptionValueChange, deletable, index, onDeletePollOption }) => {
  let [value, setValue] = useState(defaultValue);

  const onValueChange = (event) => {
    onOptionValueChange(index, event.target.value);
    setValue(event.target.value);
  };

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <div className="PollOptionInput poll-option">
      {deletable ? (
        <Button
          onClick={() => {
            onDeletePollOption(index);
          }}
          className="delete-poll-option-button"
          variant="danger"
        >
          <FontAwesomeIcon icon={faMinus} />
        </Button>
      ) : (
        <div className="button-placeholder"></div>
      )}
      <div className="poll-option-field">
        <Form.Group className="mb-3" controlId={`pollOption-${index}`}>
          <Form.Label>Option {index + 1}</Form.Label>
          <Form.Control
            required
            type="text"
            value={value}
            onChange={onValueChange}
            name="options"
            placeholder="What does this option mean?"
          />
          <Form.Control.Feedback type="invalid">The option prompt cannot be empty</Form.Control.Feedback>
        </Form.Group>
      </div>
    </div>
  );
};

PollOptionInput.propTypes = {
  defaultValue: PropTypes.string,
  onOptionValueChange: PropTypes.func,
  deletable: PropTypes.bool,
  index: PropTypes.number,
  onDeletePollOption: PropTypes.func,
};

export default PollOptionInput;
