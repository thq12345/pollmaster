import React, { useState, useRef, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import PollOptionInput from "../components/polls/pollOptionInput";
import ToastMessage from "../components/toastMessage";
import BackButton from "../components/backButton";
import "../stylesheets/polls/createPollPage.css";
import PropTypes from "prop-types";

const PUBLICMSG = "This poll will be visible in the list of all polls";
const UNLISTEDMSG = "This poll will not appear in the list of all polls, but still accessible through the URL";

const CreatePollPage = ({ hasUser }) => {
  let [options, setOptions] = useState([""]);
  let [message, setMessage] = useState(null);
  let [validated, setValidated] = useState(false);
  let [publicityMsg, setPublicityMsg] = useState(PUBLICMSG);
  let [isDisable, setDisableButton] = useState(false);

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
          index={idx}
          onDeletePollOption={handleDeletePollOption}
        />
      );
    });
  };

  const addPollOptions = () => {
    let newOptions = [...options];
    newOptions.push("");
    setOptions(newOptions);
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
    data.owner = JSON.parse(sessionStorage.getItem("user"))._id;
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
      setDisableButton(false);
      navigate(`/polls/${json.newPollId}`);
    }
  };

  return (
    <div className="CreatePollPage">
      <BackButton to="/" />
      <h1 className="mb-3 title">Create new poll</h1>
      <Form noValidate validated={validated} ref={formRef} className="rounded form" onSubmit={handleFormSubmit}>
        <div className="p-4 mb-2">
          <Form.Group className="mb-3" controlId="pollTitle">
            <Form.Label>Poll Title / Question</Form.Label>
            <Form.Control required type="text" name="title" placeholder="Enter the question for your poll" />
            <Form.Control.Feedback type="invalid">Please fill in the title / question</Form.Control.Feedback>
          </Form.Group>

          <div className="poll-options">{renderPollOptions()}</div>
          <Button className="add-poll-options-button" onClick={addPollOptions}>
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </div>

        <hr />
        <div className="general-options-div">
          <Form.Group className="mb-3" controlId="publicity">
            <Form.Label className="general-options-label">Poll visibility</Form.Label>
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
              <option value={false}>Unlisted</option>
            </Form.Select>
            <Form.Text>{publicityMsg}</Form.Text>
          </Form.Group>
        </div>

        <div className="ps-4 mb-4 submit-button-div">
          <Button type="submit" disabled={isDisable}>
            Submit
          </Button>
        </div>
      </Form>
      {message ? <ToastMessage show={true} message={message} setMessage={setMessage} type="Success" /> : null}
    </div>
  );
};

CreatePollPage.propTypes = {
  hasUser: PropTypes.bool,
};

export default CreatePollPage;
