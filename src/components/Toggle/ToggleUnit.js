import React from "react";

import { connect } from "react-redux";
import { setMetric } from "../../actions/settings";
import { setTheme } from "../../actions/settings";

import "./Toggle.css";

const ToggleUnit = (props) => {
  return (
    <div className="toggle-wrapper">
      <div>Cel</div>
      <div>
        {" "}
        <label className="switch">
          <input type="checkbox" onClick={props.setMetric} />
          <span className="slider"></span>
        </label>
      </div>
      <div>Far</div>
      <div>Day</div>
      <div>
        {" "}
        <label className="switch">
          <input type="checkbox" onClick={props.setTheme} />
          <span className="slider dark"></span>
        </label>
      </div>
      <div>Night</div>
    </div>
  );
};

const mapDispatchToProps = {
  setMetric,
  setTheme,
};

export default connect(null, mapDispatchToProps)(ToggleUnit);
