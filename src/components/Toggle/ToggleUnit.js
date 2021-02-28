import React from "react";
import { connect } from "react-redux";
import { setUnit } from "../actions/units";
import { setTheme } from "../actions/theme";

const ToggleUnit = (props) => {
  return (
    <div className="toggle-wrapper">
      <button onClick={() => setUnit}>+</button>
      <div className="toggle-text">
        Cel
        <label className="switch">
          <input type="checkbox" onChange={() => setUnit} />
          <span className="slider"></span>
        </label>
        Far
      </div>{" "}
      <div className="toggle-text">
        Day
        <label className="switch">
          <input type="checkbox" onChange={() => setTheme} />
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
