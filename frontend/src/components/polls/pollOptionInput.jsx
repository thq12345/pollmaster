import React, { useRef, useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "../../stylesheets/polls/pollOptionInput.css";
import PropTypes from "prop-types";

const PollOptionInput = ({
  defaultValue,
  onOptionValueChange,
  deletable,
  focus,
  index,
  onDeletePollOption,
  onDrag,
  setDropTarget,
  onDrop,
}) => {
  let [value, setValue] = useState(defaultValue);
  let ref = useRef();
  let [dragging, setDragging] = useState(false);
  let [dropping, setDropping] = useState(false);
  let [dragCounter, setDragCounter] = useState(0);
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

  const generateClassName = () => {
    let name = "PollOptionInput poll-option";
    if (dragging) return name + " drag";
    if (dropping) return name + " drop";
    else return name;
  };

  useEffect(() => {
    if (dragCounter === 0) {
      setDropping(false);
    } else {
      setDropping(true);
    }
  }, [dragCounter]);

  return (
    <div
      // className="PollOptionInput poll-option"
      className={generateClassName()}
      draggable={true}
      onDragStart={() => {
        onDrag(index);
        setDragging(true);
        // console.log("started dragging");
      }}
      onDragEnter={(e) => {
        e.preventDefault();
        setDragCounter(dragCounter + 1);
        setDropTarget(index);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setDragCounter(dragCounter - 1);
      }}
      onDragEnd={(e) => {
        e.preventDefault();
        setDragging(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        onDrop();
        setDragCounter(0);
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
    >
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
          <Form.Label className="poll-text">Option {index + 1}</Form.Label>
          <Form.Control
            draggable={true}
            onDragStart={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="poll-text"
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
  onDrag: PropTypes.func,
  setDropTarget: PropTypes.func,
  onDrop: PropTypes.func,
};

export default PollOptionInput;
