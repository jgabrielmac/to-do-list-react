import React from "react";
import "./snack.css";

const SnackBar = ({ openMessage, message, type }) => {
  const classCondition = type === "error" ? "snack-bar error" : "snack-bar";
  return (
    openMessage && (
      <div className={classCondition}>
        <p className="">{message}</p>
      </div>
    )
  );
};

export default SnackBar;
