import React from "react";
import { Link } from "react-router-dom";

const BackButton = ({ to, type }) => {
  return (
    <Link to={to} className={type ? `btn btn-${type}` : "btn btn-primary"}>
      <i className="fas fa-arrow-left"></i> Back
    </Link>
  );
};

export default BackButton;
