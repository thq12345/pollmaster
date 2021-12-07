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
  const [index, setIndex] = useState(0);
  let [hoverIdx, setHoverIdx] = useState(-1);
  let [page, setPage] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const handleHover = (idx) => {
    setHoverIdx(idx);
  };

  const renderCarousel = () => {
    return polls.map((el, idx) => {
      return (
        <Carousel.Item key={idx}>
          <PollListItem poll={el} idx={idx} onHover={handleHover} hover={hoverIdx === idx} />
          {/* <PollListItem poll={el} idx={idx + 1} onHover={handleHover} hover={hoverIdx === idx} /> */}
          {/* <PollListItem poll={el} idx={idx + 2} onHover={handleHover} hover={hoverIdx === idx} /> */}
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
  polls: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    options: PropTypes.arrayOf({
      prompt: PropTypes.string,
      votes: PropTypes.number,
    }),
    owner: PropTypes.string,
    totalVotes: PropTypes.number,
    public: PropTypes.bool,
    createdAt: PropTypes.number,
    ttl: PropTypes.number,
  }),
};

export default PollCarousel;
