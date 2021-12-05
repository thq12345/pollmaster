import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const NeedPermissionPage = ({ to, delay }) => {
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
      <h1>Sorry! You need to be logged in to see this page</h1>
      <h2>You will be redirected back to home in a few seconds...</h2>
      <a href="/"> Click me if not redirecting...</a>
    </div>
  );
};

NeedPermissionPage.propTypes = {
  to: PropTypes.string,
  delay: PropTypes.number,
};

export default NeedPermissionPage;
