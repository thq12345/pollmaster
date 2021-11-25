import React, { useState } from "react";
import { Container, ListGroup } from "react-bootstrap";
import PollListItem from "./pollListItem";
import PollListHeader from "./pollListHeader";

const sortFcn = (a, b, sortIndex, order) => {
  return order * (a[sortIndex] - b[sortIndex]);
};

const PollList = ({ polls }) => {
  let [hoverIdx, setHoverIdx] = useState(-1);
  let [sortIndex, setSortIndex] = useState("ttl");
  let [sortOrder, setSortOrder] = useState(-1);

  /*
    The purpose of pullIDList is to display the list of polls 
    in the user.createdPoll and user.votedPolls

    Option 1:
      if(pollIdList){
        const listToDisplay = {}
        for id in pollIdList:
          res = query/fetch the ID
          listToDisplay.append(res)
      }
    
    Option 2:
      query from all the list in res below
  */

  const handleHover = (idx) => {
    setHoverIdx(idx);
  };

  const handleChangeSortIndex = (index) => {
    if (index === sortIndex) setSortOrder(-1 * sortOrder);
    setSortIndex(index);
  };

  const renderPollList = () => {
    if (polls.length === 0) {
      return <div>The list is empty</div>;
    }

    return polls
      .sort((a, b) => {
        return sortFcn(a, b, sortIndex, sortOrder);
      })
      .map((el, idx) => {
        return <PollListItem key={idx} poll={el} idx={idx} onHover={handleHover} hover={hoverIdx === idx} />;
      });
  };

  return (
    <Container>
      <div style={{ width: "70%", margin: "0 auto" }}>
        {polls.length !== 0 ? (
          <PollListHeader onChangeSortIndex={handleChangeSortIndex} sortIndex={sortIndex} sortOrder={sortOrder} />
        ) : null}
        <ListGroup>{renderPollList()}</ListGroup>
      </div>
    </Container>
  );
};

export default PollList;
