import React, { useEffect, useState } from "react";
import FavoriteCard from "../FavoriteCard/FavoriteCard";

import { connect } from "react-redux";
import { getFavorites } from "../../selectors/data";
import { getTheme } from "../../selectors/settings";

import "./Favorites.css";
import day from "../assets/day-favbg.jpg";
import night from "../assets/night-favbg.jpg";

function Favorites(props) {
  const [favBg, setFavBg] = useState(day);

  useEffect(() => {
    bgSwitch();
  }, [props.theme]);

  const bgSwitch = () => {
    if (!props.theme) {
      setFavBg(day);
    } else {
      setFavBg(night);
    }
  };

  return (
    <div
      className="favorite-card"
      style={{ backgroundImage: `url(${favBg})`, transition: "all 1s ease-in" }}
    >
      {props.favorites.map((item) => (
        <FavoriteCard
          key={item.townID}
          favoriteTownID={item.townID}
          favoriteTownName={item.townName}
        />
      ))}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    favorites: getFavorites(state),
    theme: getTheme(state),
  };
};

export default connect(mapStateToProps, null)(Favorites);
