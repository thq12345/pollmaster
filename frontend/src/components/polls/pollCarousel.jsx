/*
This is a potential option to put in the home page,
but it looks weird when I made this alpha version.
I assume a video will be better.
Keeping this here for now and I will delete it if the video is better.
*/

import React, { useState, useEffect } from "react";
import PollListItem from "./pollListItem";
import PropTypes from "prop-types";
import { Carousel, Container } from "react-bootstrap";

const PollCarousel = ({ polls }) => {
  const pageSize = 5;
  let [hoverIdx, setHoverIdx] = useState(-1);
  let [page, setPage] = useState(0);

  const handleSelect = (selectedIndex) => {
    setPage(selectedIndex);
  };

  const handleHover = (idx) => {
    setHoverIdx(idx);
  };

  const renderCarousel = () => {
    let items = [];
    for (let i = 0; i < Math.ceil(polls.length / pageSize); i++) {
      items.push(i);
    }
    return items.map((item) => {
      return (
        <Carousel.Item key={item}>
          {polls.slice(pageSize * page, pageSize * (page + 1)).map((el, idx) => {
            return <PollListItem key={idx} poll={el} idx={idx} onHover={handleHover} hover={hoverIdx === idx} />;
          })}
        </Carousel.Item>
      );
    });
  };

  return (
    <Container>
      <Carousel indicators={false} pause="hover">
        {renderCarousel()}
      </Carousel>
    </Container>
  );
};

PollCarousel.propTypes = {
  polls: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          prompt: PropTypes.string,
          votes: PropTypes.number,
        })
      ),
      owner: PropTypes.string,
      totalVotes: PropTypes.number,
      public: PropTypes.bool,
      createdAt: PropTypes.number,
      ttl: PropTypes.number,
    })
  ),
};

export default PollCarousel;
