import React, { useEffect, useState } from "react";
import { getFavorites } from "../selectors/favorites";
import { connect, useSelector } from "react-redux";
import FavoriteCard from "../FavoriteCard/FavoriteCard";

function Favorites(props) {
  const [favoritesTown, setFavoritesTown] = useState(
    useSelector((state) => state.favorites)
  );

 

  // async componentDidMount() {
  //     const {favorites} = props
  //     const favoritesTown = []
  //     for await (let id of favorites) {
  //         const request = getCurrentWeather(id)
  //         const response = await axios.get(request)
  //         const results = response.data.data.results[0]
  //         console.log(results)
  //         favorites.push(results)
  //     }
  //     setFavoritesTown({favorites})
  // }

  



  return (
    <div>
      <div className="favorite">Favorites</div>
      <div className="favorite-card">
        {favoritesTown.map((item) => (
          <FavoriteCard favoriteTownID={props.favoritesTown.favoriteTownID} />
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    favorites: getFavorites(state),
  };
};

export default connect(mapStateToProps)(Favorites);
