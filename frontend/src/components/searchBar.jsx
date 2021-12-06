import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = () => {
  let [searchText, setSearchText] = useState("");
  let getSearchId = (val) => {
    setSearchText(val.target.value);
  };
  const searchIcon = <FontAwesomeIcon icon={faSearch} />;

  return (
    <div className="searchBarContainer">
      <Form className="d-flex searchBar">
        <Form.Control
          value={searchText}
          onChange={getSearchId}
          type="search"
          placeholder="Search for a poll"
          className="searchInput"
          aria-label="Search"
        />
        <Button
          className="me-2"
          href={searchText ? `/polls/${searchText}` : "#"}
          variant="outline-light"
          style={{ whiteSpace: "nowrap" }}
        >
          {searchIcon} Search
        </Button>
      </Form>
    </div>
  );
};

export default SearchBar;
