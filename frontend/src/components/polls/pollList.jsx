import React, { useEffect, useState } from "react";
import { ListGroup, Pagination } from "react-bootstrap";
import PollListItem from "./pollListItem";
import PollListHeader from "./pollListHeader";
import "../../stylesheets/polls/pollList.css";
import PropTypes from "prop-types";

const sortFcn = (a, b, sortIndex, order) => {
  return order * (a[sortIndex] - b[sortIndex]);
};

const PollList = ({ polls, pagesize }) => {
  const PAGESIZE = pagesize;
  let [hoverIdx, setHoverIdx] = useState(-1);
  let [sortIndex, setSortIndex] = useState("ttl");
  let [sortOrder, setSortOrder] = useState(-1);
  let [page, setPage] = useState(1);
  let [pagination, setPagination] = useState([]);
  let maxPageNumber = Math.ceil(polls.length / PAGESIZE);

  const handleChangePage = (pageNumber) => {
    setPage(pageNumber);
  };

  const paginationKeyboardClick = (e) => {
    if (e.key === "Enter") {
      e.currentTarget.click();
    }
  };

  const renderPagination = () => {
    return (
      <Pagination className="mb-0">
        <Pagination.First
          onClick={() => {
            handleChangePage(1);
          }}
          onKeyUp={paginationKeyboardClick}
        />
        <Pagination.Prev
          disabled={page === 1}
          onClick={() => {
            handleChangePage(page - 1);
          }}
          onKeyUp={paginationKeyboardClick}
        />
        <Pagination.Item
          active={page === 1}
          onClick={() => {
            handleChangePage(1);
          }}
          onKeyUp={paginationKeyboardClick}
        >
          {1}
        </Pagination.Item>
        {pagination}
        {maxPageNumber > 1 && (
          <Pagination.Item
            active={page === maxPageNumber}
            onClick={() => {
              handleChangePage(maxPageNumber);
            }}
            onKeyUp={paginationKeyboardClick}
          >
            {maxPageNumber}
          </Pagination.Item>
        )}
        <Pagination.Next
          disabled={page === maxPageNumber}
          onClick={() => {
            handleChangePage(page + 1);
          }}
          onKeyUp={paginationKeyboardClick}
        />
        <Pagination.Last
          onClick={() => {
            handleChangePage(maxPageNumber);
          }}
          onKeyUp={paginationKeyboardClick}
        />
      </Pagination>
    );
  };

  useEffect(() => {
    let paginator = [];
    if (page - 2 > 2) paginator.push(<Pagination.Ellipsis key="pre" />);
    for (let number = Math.max(page - 2, 2); number <= Math.min(page + 2, maxPageNumber - 1); number++) {
      paginator.push(
        <Pagination.Item
          key={number}
          active={number === page}
          onClick={() => {
            handleChangePage(number);
          }}
          onKeyUp={paginationKeyboardClick}
        >
          <div className="paginator">{number}</div>
        </Pagination.Item>
      );
    }
    if (page + 3 < maxPageNumber) {
      paginator.push(<Pagination.Ellipsis key="suf" />);
    }
    setPagination(paginator);
  }, [polls, page]);

  const handleHover = (idx) => {
    setHoverIdx(idx);
  };

  const handleChangeSortIndex = (index) => {
    if (index === sortIndex) setSortOrder(-1 * sortOrder);
    setSortIndex(index);
  };

  const renderPollList = () => {
    if (polls.length === 0) {
      return <div className="empty-list">The list is empty</div>;
    }

    return polls
      .sort((a, b) => {
        return sortFcn(a, b, sortIndex, sortOrder);
      })
      .slice((page - 1) * PAGESIZE, page * PAGESIZE)
      .map((el, idx) => {
        return <PollListItem key={idx} poll={el} idx={idx} onHover={handleHover} hover={hoverIdx === idx} />;
      });
  };

  return (
    <div className="PollList">
      {polls.length !== 0 ? (
        <PollListHeader onChangeSortIndex={handleChangeSortIndex} sortIndex={sortIndex} sortOrder={sortOrder} />
      ) : null}
      <ListGroup>{renderPollList()}</ListGroup>
      {renderPagination()}
    </div>
  );
};

PollList.propTypes = {
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
  pagesize: PropTypes.number,
};

export default PollList;
