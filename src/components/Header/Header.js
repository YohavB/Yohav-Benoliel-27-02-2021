import React, { useEffect, useState } from "react";
import ToggleUnit from "../Toggle/ToggleUnit";
import { NavLink } from "react-router-dom";

import { connect } from "react-redux";
import { getFavorites } from "../../selectors/data";
import { getTheme } from "../../selectors/settings";
import { populateFavorites } from "../../actions/data";

import "./Header.css"
import xicon from "../assets/close_icon.svg";
import hambicon from "../assets/hamburger_icon.svg";

function Header(props) {
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    importLocalFav();
  }, []);

  useEffect(() => {
    updateLocalFav();
  }, [props.favorites]);

  const importLocalFav = () => {
    const localFav = localStorage.getItem("favorites-city");

    if (localFav) {
      props.populateFavorites(JSON.parse(localFav));
    }
  };
  const updateLocalFav = () => {
    if (props.favorites.length > 0) {
      localStorage.setItem("favorites-city", JSON.stringify(props.favorites));
    }
  };

  function toggleNav() {
    setOpenNav(!openNav);
  }

  return (
    <div
      className={`header ${props.theme ? "dark" : null} ${
        openNav ? "open" : null
      }`}
    >
      <div className="header-title">Accu-Weather by YB</div>
      <div
        className={`toggle-nav ${props.theme ? "dark" : null}`}
        onClick={toggleNav}
      >
        <img
          className={`menu-icon ${props.theme ? "dark" : null}`}
          src={` ${openNav ? xicon : hambicon}`}
          alt="Menu"
        />
      </div>
      <ToggleUnit />

      <div className="navlink">
        <NavLink
          exact
          to="/"
          className="btn-tab"
          activeClassName={`current-tab ${props.theme ? "dark" : null}`}
          onClick={toggleNav}
        >
          Home
        </NavLink>
        <NavLink
          to="/favorites"
          className="btn-tab"
          activeClassName={`current-tab ${props.theme ? "dark" : null}`}
          onClick={toggleNav}
        >
          Favorites
        </NavLink>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    favorites: getFavorites(state),
    theme: getTheme(state),
  };
};

const mapDispatchToProps = {
  populateFavorites,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
