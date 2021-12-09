import React, { useState, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";

const SearchBar = () => {
  let [searchText, setSearchText] = useState("");
  let navigate = useNavigate();
  let inputRef = useRef();
  let getSearchId = (val) => {
    setSearchText(val.target.value);
  };
  const searchIcon = <FontAwesomeIcon icon={faSearch} />;

  const navigateToResultPage = () => {
    navigate(`/polls?search=${inputRef.current.value}`);
  };

  return (
    <div className="searchBarContainer">
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          navigateToResultPage();
        }}
        className="d-flex searchBar"
      >
        <Form.Control
          value={searchText}
          onChange={getSearchId}
          type="search"
          name="search"
          ref={inputRef}
          placeholder="Search for a poll"
          className="searchInput"
          aria-label="Search"
        />
        <Button
          onClick={() => {
            navigateToResultPage();
          }}
          aria-label="search"
          className="me-2"
          variant="outline-light"
        >
          {searchIcon}
        </Button>
      </Form>
    </div>
  );
};

export default SearchBar;
