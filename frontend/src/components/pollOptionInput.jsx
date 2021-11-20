import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";

const styles = {
  deletePollOptionButton: {
    marginTop: "1em",
    padding: "0 0.75em",
    height: "2em",
    alignSelf: "center",
  },
  buttonPlaceholder: {
    width: "2.5em",
  },
  pollOption: {
    display: "flex",
  },
  pollOptionField: {
    width: "90%",
    marginLeft: "1em",
  },
};

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
    <div style={styles.pollOption}>
      {deletable ? (
        <Button
          onClick={() => {
            onDeletePollOption(index);
          }}
          style={styles.deletePollOptionButton}
          variant="danger"
        >
          <i className="fas fa-minus"></i>
        </Button>
      ) : (
        <div style={styles.buttonPlaceholder}></div>
      )}
      <div style={styles.pollOptionField}>
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

export default PollOptionInput;
