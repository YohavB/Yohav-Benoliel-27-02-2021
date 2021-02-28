import React from "react";

const ToggleUnit = (props) => {
  return (
    <div className="toggle-wrapper">
      {" "}
      <div className="toggle-text">
        Cel
        <label className="switch">
          <input type="checkbox" />
          <span className="slider"></span>
        </label>
        Far
      </div>{" "}
      <div className="toggle-text">
        Day
        <label className="switch">
          <input type="checkbox" />
          <span className="slider dark"></span>
        </label>
        Night
      </div>
    </div>
  );
};

export default ToggleUnit;
