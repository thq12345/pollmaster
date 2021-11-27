import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const NotFoundPage = ({ to, delay }) => {
  let navigate = useNavigate();
  let [redirecting, setRedirecting] = useState(false);

  const redirect = () => {
    setTimeout(() => {
      setRedirecting(true);
    }, delay || 3000);
  };

  useEffect(redirect, []);

  useEffect(() => {
    if (redirecting) {
      navigate(to);
    }
  }, [redirecting]);

  return (
    <div style={{ textAlign: "center", marginTop: "2em" }}>
      <h1>Sorry! Cannot find the page you asked for</h1>
      <h2>You will be redirected back to home in a few seconds</h2>
    </div>
  );
};

NotFoundPage.propTypes = {
  to: PropTypes.string,
  delay: PropTypes.number,
};

export default NotFoundPage;
