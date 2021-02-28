import React from "react";
import { connect } from "react-redux";
import { setUnit } from "../actions/settings";
import { setTheme } from "../actions/settings";

const ToggleUnit = (props) => {
  return (
    <div className="toggle-wrapper">
      <button onClick={props.setUnit}>+</button>
      <div className="toggle-text">
        Cel
        <label className="switch">
          <input type="checkbox" onChange={props.setUnit} />
          <span className="slider"></span>
        </label>
        Far
      </div>{" "}
      <div className="toggle-text">
        Day
        <label className="switch">
          <input type="checkbox" onChange={props.setTheme} />
          <span className="slider dark"></span>
        </label>
        Night
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  setUnit,
  setTheme,
};

export default connect(null, mapDispatchToProps)(ToggleUnit); // DONE mapdispatch c le 2eme argument, tu dois faire connect(null, mapDispatchToProps)
