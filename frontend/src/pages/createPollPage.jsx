import React, { useState, useRef } from "react";
import { Form, Button, Container } from "react-bootstrap";
import "../stylesheets/createPoll.css";
import PollOptionInput from "../components/pollOptionInput";
import ToastMessage from "../components/toastMessage";

const CreatePollPage = () => {
  let [options, setOptions] = useState([""]);
  let [message, setMessage] = useState(null);
  let formRef = useRef();

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
    let formData = new FormData(formRef.current);
    let data = {};
    formData.forEach((val, key) => {
      if (key === "options") {
        data[key] = data[key] === undefined ? [val] : [...data[key], val];
      } else {
        data[key] = val;
      }
    });
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
    }
  };

  return (
    <main>
      <Container>
        <h1>Create new poll</h1>
        <Form ref={formRef} className="rounded" onSubmit={handleFormSubmit}>
          <div className="p-4">
            <Form.Group className="mb-3" controlId="pollTitle">
              <Form.Label>Poll Title / Question</Form.Label>
              <Form.Control required type="text" name="title" placeholder="Enter the question for your poll" />
            </Form.Group>

            <div id="pollOptions">
              {renderPollOptions()}

              <Button onClick={addPollOptions} style={{ borderRadius: "50%" }}>
                <i className="fas fa-plus"></i>
              </Button>
            </div>
          </div>

          <div className="p-4">
            <Button type="submit">Submit</Button>
          </div>
        </Form>
        {message ? <ToastMessage show={true} message={message} setMessage={setMessage} type="Success" /> : null}
      </Container>
    </main>
  );
};

export default CreatePollPage;
