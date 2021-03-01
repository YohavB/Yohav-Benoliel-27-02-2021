import React, { useEffect, useState } from "react";
import { getFavorites } from "../selectors/data";
import { connect } from "react-redux";
import FavoriteCard from "../FavoriteCard/FavoriteCard";
import "./Favorites.css";
import { getTheme } from "../selectors/settings";

import day from "../assets/day-favbg.jpg";
import night from "../assets/night-favbg.jpg";

// const data = [
//   { favoriteTownID: 215854, favoriteTownName: "Tel Aviv" },
//   { favoriteTownID: 215415, favoriteTownName: "Tel Aviv" },
//   { favoriteTownID: 515484, favoriteTownName: "Tel Aviv" },
// ];

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
      style={{ backgroundImage:`url(${favBg})`,
      transition: "all 1s ease-in"}}
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
