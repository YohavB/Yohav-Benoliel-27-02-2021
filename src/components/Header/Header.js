import React, {useEffect} from "react"
import { NavLink } from "react-router-dom";
import ToggleUnit from "../Toggle/ToggleUnit";
import {getFavorites} from "../selectors/data"
import {populateFavorites} from "../actions/data"
import {connect} from "react-redux"

function Header(props) {
	useEffect(() => {
		importLocalFav();
	}, []);

	useEffect(() => {
		updateLocalFav();
	}, [props.favorites]);


	const importLocalFav = () => {
		const localFav = localStorage.getItem("favorites-city")
		console.log(`%c ${new Date().toLocaleTimeString()}`,'color: greenyellow;', 'ln.58 - Home.importLocalFav(), localFav:', localFav)
		if (localFav) {
			props.populateFavorites(JSON.parse(localFav));
		}
	};
	const updateLocalFav = () => {
		if (props.favorites.length > 0) {
			localStorage.setItem('favorites-city', JSON.stringify(props.favorites))
		}
	};

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


const mapStateToProps = (state) => {
	return {
		favorites: getFavorites(state),
	};
};

const mapDispatchToProps = {
	populateFavorites,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
