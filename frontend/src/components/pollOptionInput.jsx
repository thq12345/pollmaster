import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import "../stylesheets/pollOption.css";

const PollOptionInput = ({ defaultValue, onOptionValueChange, index, onDeletePollOption }) => {
  let [value, setValue] = useState(defaultValue);

  const onValueChange = (event) => {
    onOptionValueChange(index, event.target.value);
    setValue(event.target.value);
  };

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <div className="poll-option">
      {index !== 0 ? (
        <Button
          onClick={() => {
            onDeletePollOption(index);
          }}
          className="delete-poll-option-button"
          variant="danger"
        >
          <i className="fas fa-minus"></i>
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
        </Form.Group>
      </div>
    </div>
  );
};

export default PollOptionInput;
