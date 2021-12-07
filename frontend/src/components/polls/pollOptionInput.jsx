import React, { useRef, useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "../../stylesheets/polls/pollOptionInput.css";
import PropTypes from "prop-types";

const PollOptionInput = ({ defaultValue, onOptionValueChange, deletable, focus, index, onDeletePollOption }) => {
  let [value, setValue] = useState(defaultValue);
  let ref = useRef();
  const onValueChange = (event) => {
    onOptionValueChange(index, event.target.value);
    setValue(event.target.value);
  };

  useEffect(() => {
    if (focus) {
      ref.current.focus();
    }
  }, [focus]);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <div className="PollOptionInput poll-option">
      {deletable ? (
        <Button
          aria-label="Remove option"
          onClick={() => {
            onDeletePollOption(index);
          }}
          className="delete-poll-option-button"
          variant="danger"
        >
          <FontAwesomeIcon icon={faTimes} />
        </Button>
      ) : (
        <div className="button-placeholder"></div>
      )}
      <div className="poll-option-field">
        <Form.Group className="mb-3" controlId={`pollOption-${index}`}>
          <Form.Label>Option {index + 1}</Form.Label>
          <Form.Control
            required
            ref={ref}
            type="text"
            value={value}
            onChange={onValueChange}
            name="options"
            placeholder="Type in your option prompt here"
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
  focus: PropTypes.bool,
  index: PropTypes.number,
  onDeletePollOption: PropTypes.func,
};

export default PollOptionInput;
