import React, { useEffect, useState } from "react";
import BackButton from "../components/backButton";
import PollList from "../components/polls/pollList";
import Loader from "../components/loader";
import useQuery from "../hooks/useQuery";
import "../stylesheets/polls/pollListPage.css";

const PollsListPage = () => {
  const searchString = useQuery().get("search");

  let [pollList, setPollList] = useState([]);
  let [loading, setLoading] = useState(false);
  //Set the number of list show in a page
  const listSize = 15;

  const getPollList = async (searchString) => {
    let res = await fetch("/api/polls");
    if (res.ok) {
      let json = await res.json();

      if (searchString) {
        json = json.filter((el) => {
          return el.title.toLowerCase().indexOf(searchString.toLowerCase()) !== -1;
        });
      }

      setPollList(json);
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getPollList(searchString);
  }, [searchString]);

  return (
    <div className="PollListPage">
      <div className="centering">
        <BackButton to="/" />
      </div>
      <h1 className="text-center">Public Polls</h1>
      <div className="text-center">Click a poll title and vote in some of the polls.</div>
      <hr className="mb-5 centering" />

      {loading ? (
        <div className="text-center">
          <Loader />

          <div style={{ fontSize: "2em" }}>Loading polls...</div>
        </div>
      ) : (
        <PollList pagesize={listSize} polls={pollList} />
      )}
    </div>
  );
};

export default PollsListPage;
