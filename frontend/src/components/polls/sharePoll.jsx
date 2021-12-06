import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { Button } from "react-bootstrap";
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from "react-share";
import PropTypes from "prop-types";

const SharePollSelections = ({ title, url }) => {
  const shareTitle = title;
  const shareUrl = url;
  const shareHashtags = ["pollMaster", "voteToday"];
  const iconSize = 38;
  let [copyText, setCopyText] = useState("Copy URL Link");

  const copyUrl = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopyText("Copied URL Link!");
    // setInterval(async () => {
    //   setCopyText("Copy URL Link");
    // }, 3000);
    // clearInterval();
  };

  return (
    <div>
      <Button aria-label="copy poll link" className="copy-poll-link-button p-2 btn" onClick={copyUrl}>
        <FontAwesomeIcon icon={faCopy} /> {copyText}
      </Button>
      <FacebookShareButton title={shareTitle} url={shareUrl} hashtags={shareHashtags}>
        <FacebookIcon round size={iconSize} />
      </FacebookShareButton>

      <TwitterShareButton title={shareTitle} url={shareUrl} hashtags={shareHashtags}>
        <TwitterIcon round size={iconSize} />
      </TwitterShareButton>
    </div>
  );
};

SharePollSelections.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
};

export default SharePollSelections;
