import React from "react";
import { NavLink } from "react-router-dom";
import ToggleUnit from "../Toggle/ToggleUnit";

export default function Header(props) {
  return (
    <div className="header">
      <div className="header-title">HEADER</div>
      <ToggleUnit />

      <div className="navlink">
        <NavLink exact to="/" activeClassName="active-tab">
          Home
        </NavLink>
        <NavLink to="/favorites" activeClassName="active-tab">
          Favorites
        </NavLink>
      </div>
    </div>
  );
}
