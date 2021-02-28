import React from "react";
import { useDispatch, connect } from "react-redux";
import { setUnit } from "../actions/units";
import { setTheme } from "../actions/theme";

const ToggleUnit = (props) => {
  const dispatch = useDispatch();

  return (
    <div className="toggle-wrapper">
      <button onClick={() => dispatch(setUnit)}>+</button>
      <div className="toggle-text">
        Cel
        <label className="switch">
          <input type="checkbox" onChange={() => dispatch(setUnit)} />
          <span className="slider"></span>
        </label>
        Far
      </div>{" "}
      <div className="toggle-text">
        Day
        <label className="switch">
          <input type="checkbox" onChange={() => dispatch(setTheme)} />
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

export default connect(mapDispatchToProps)(ToggleUnit);
