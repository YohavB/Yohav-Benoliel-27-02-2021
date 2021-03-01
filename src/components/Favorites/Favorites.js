import React, { useEffect, useState } from "react";
import { getFavorites } from "../selectors/data";
import { connect } from "react-redux";
import FavoriteCard from "../FavoriteCard/FavoriteCard";
import "./Favorites.css";

const data = [
  { favoriteTownID: 215854, favoriteTownName: "Tel Aviv" },
  { favoriteTownID: 215415, favoriteTownName: "Tel Aviv" },
  { favoriteTownID: 515484, favoriteTownName: "Tel Aviv" },
];

function Favorites(props) {
  const [favoritesTown, setFavoritesTown] = useState(data);

  useEffect(() => {}, []);

  return (
    <div className="favorite-card">
      {favoritesTown.map((item) => (
        
          <FavoriteCard
            key={item.favoriteTownID}
            favoriteTownID={item.favoriteTownID}
            favoriteTownName={item.favoriteTownName}
          />
        
      ))}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    favorites: getFavorites(state),
  };
};

export default connect(mapStateToProps)(Favorites);
