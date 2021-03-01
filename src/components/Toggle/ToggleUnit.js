import React from "react";
import { connect } from "react-redux";
import { setMetric } from "../actions/settings";
import { setTheme } from "../actions/settings";

const ToggleUnit = (props) => {
  return (
    <div className="toggle-wrapper">
      <div className="toggle-text">
        Cel
        <label className="switch">
          <input
            type="checkbox"
            onClick={props.setMetric}
          />
          <span className="slider"></span>
        </label>
        Far
      </div>{" "}
      <div className="toggle-text">
        Day
        <label className="switch">
          <input
            type="checkbox"
            onClick={props.setTheme}
          />
          <span className="slider dark"></span>
        </label>
        Night
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  setMetric,
  setTheme,
};

export default connect(null, mapDispatchToProps)(ToggleUnit);
