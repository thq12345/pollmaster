import React, { useState, useRef, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PollOptionInput from "../components/polls/pollOptionInput";
import ToastMessage from "../components/toastMessage";
import BackButton from "../components/backButton";
import "../stylesheets/polls/createPollPage.css";
import "../stylesheets/polls/pollOptionInput.css";
import PropTypes from "prop-types";

const PUBLICMSG = "This poll will be visible in the list of all polls";
const UNLISTEDMSG = "This poll will not appear in the list of all polls, but still accessible through the URL";

let timeout = null;
const throttle = (callback, delay) => {
  return (...params) => {
    if (timeout) return;
    callback.call(null, ...params);
    timeout = setTimeout(() => {
      timeout = null;
    }, delay);
  };
};

const CreatePollPage = ({ hasUser }) => {
  let [options, setOptions] = useState([""]);
  let [message, setMessage] = useState(null);
  let [error, setError] = useState(null);
  let [validated, setValidated] = useState(false);
  let [publicityMsg, setPublicityMsg] = useState(PUBLICMSG);
  let [isDisable, setDisableButton] = useState(false);
  let [focus, setFocus] = useState(-1);

  let formRef = useRef();
  // let [redirect, setRedirect] = useState(null);
  let navigate = useNavigate();

  const handleRedirect = (to) => {
    navigate(to);
  };

  useEffect(() => {
    if (!hasUser) {
      // setRedirect("/login");
      handleRedirect("/login");
    }
  }, [hasUser]);

  // useEffect(() => {
  //   if (focus !== -1 && focus < options.length) {
  //     document.querySelector(`#pollOption-${focus}`).focus();
  //   }
  // }, [focus]);

  const handleOptionValueChange = (idx, value) => {
    let newOptions = options.map((el, i) => {
      return i === idx ? value : el;
    });
    setOptions(newOptions);
  };

  const handleDeletePollOption = (idx) => {
    let newOption = options.filter((el, i) => {
      return i !== idx;
    });
    setOptions(newOption);
  };

  const renderPollOptions = () => {
    return options.map((el, idx) => {
      return (
        <PollOptionInput
          key={idx}
          defaultValue={el}
          onOptionValueChange={handleOptionValueChange}
          deletable={options.length > 1}
          focus={idx === focus}
          index={idx}
          onDeletePollOption={handleDeletePollOption}
        />
      );
    });
  };

  const addPollOptions = (value) => {
    let newOptions = [...options];
    newOptions.push(value);
    setOptions(newOptions);
    setFocus(newOptions.length - 1);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setValidated(true);
    setDisableButton(true);
    let form = e.currentTarget;
    if (!form.checkValidity()) {
      setDisableButton(false);
      return;
    }

    let formData = new FormData(formRef.current);
    let data = {};
    formData.forEach((val, key) => {
      if (key === "options") {
        data[key] = data[key] === undefined ? [val] : [...data[key], val];
      } else {
        data[key] = val;
      }
    });
    data.owner = JSON.parse(localStorage.getItem("user"))._id;
    let res = await fetch("/api/polls/create-poll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      let json = await res.json();
      setMessage(json.message);
      navigate(`/polls/${json.newPollId}`);
    } else {
      try {
        let json = await res.json();
        setError(json.message);
      } catch (e) {
        setError("Unable to connect to server, please try again later");
      }
    }
    setDisableButton(false);
  };

  return (
    <div className="CreatePollPage">
      <BackButton to="/" />
      <h1 className="mb-3 title">Create New Poll</h1>
      <div>Note: You cannot edit poll after it is created!</div>
      <Form noValidate validated={validated} ref={formRef} className="rounded form" onSubmit={handleFormSubmit}>
        <div className="p-4 mb-2">
          <Form.Group className="mb-3" controlId="pollTitle">
            <Form.Label>Poll Title / Question</Form.Label>
            <Form.Control required type="text" name="title" placeholder="Enter the question for your poll" />
            <Form.Control.Feedback type="invalid">Please fill in the title / question</Form.Control.Feedback>
          </Form.Group>

          <div className="poll-options mt-5 mb-1">{renderPollOptions()}</div>

          <Form.Group className="mb-3" style={{ marginLeft: "3.25em" }} controlId="placeholderInput">
            <Form.Label>Add option</Form.Label>
            <Form.Control
              type="text"
              value=""
              onChange={throttle((e) => {
                addPollOptions(e.currentTarget.value);
              }, 500)}
              placeholder="Type here to start new option"
            />
          </Form.Group>

          {/* <Button
            className="add-poll-options-button"
            onClick={() => {
              addPollOptions("");
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
          </Button> */}
        </div>

        <hr />
        <div className="general-options-div">
          <Form.Group className="mb-3" controlId="publicity">
            <Form.Label className="general-options-label">Poll Visibility</Form.Label>
            <Form.Select
              name="public"
              onChange={(e) => {
                if (e.currentTarget.value === "true") {
                  setPublicityMsg(PUBLICMSG);
                } else {
                  setPublicityMsg(UNLISTEDMSG);
                }
              }}
              aria-label="Select publicity"
            >
              <option value={true}>Public</option>
              <option value={false}>Private</option>
            </Form.Select>
            <Form.Text>{publicityMsg}</Form.Text>
          </Form.Group>
        </div>

        <div className="ps-4 submit-button-div">
          <Button type="submit" disabled={isDisable}>
            Submit
          </Button>
        </div>
        <div className="text-center mt-2 mb-2">Note: The expiration date is defaulted to 30 days in the future</div>
      </Form>
      {message ? <ToastMessage show={true} message={message} setMessage={setMessage} type="Success" /> : null}
      {error ? <ToastMessage show={true} message={error} setMessage={setError} type="Error" /> : null}
    </div>
  );
};

CreatePollPage.propTypes = {
  hasUser: PropTypes.bool,
};

export default CreatePollPage;
