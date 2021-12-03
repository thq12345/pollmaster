import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const SearchBar = () => {
  let [searchText, setSearchText] = useState("");
  let getSearchId = (val) => {
    setSearchText(val.target.value);
  };

  return (
    <Form className="d-flex">
      <Button className="me-2" href={searchText ? `/polls/${searchText}` : "#"} variant="outline-success">
        Search
      </Button>
      <Form.Control
        value={searchText}
        onChange={getSearchId}
        type="search"
        placeholder="Search for a poll"
        className="me-2"
        aria-label="Search"
      />
    </Form>
  );
};

export default SearchBar;
