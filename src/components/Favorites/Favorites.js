import React, { useState } from "react";
import axios from "axios";
import { getFavorites } from "../selectors/favorites";
import { connect, useSelector } from "react-redux";
import Moment from "react-moment";

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

  //  async function getCurrentWeather() {
  //   if (!error && query) {
  //     try {
  //       const res = axios.get(
  //         `  ${api.base}/currentconditions/v1/${keyTown}?apikey=%09${api.key}`
  //       );

  //       console.log(res.data);
  //       console.log(res.status);
  //       console.log(res.statusText);
  //       if (res.status === 200) {
  //         setWeatherData(res.data);
  //       } else {
  //         setError("An Error has occured");
  //       }
  //     } catch (e) {}
  //   } else if (!error && !query) {
  //     setError("The Search Field is Empty!");
  //   }
  //   setQuery("");
  // }

  return <div className="favorite">Favorites</div>;
}

const mapStateToProps = (state) => {
  return {
    favorites: getFavorites(state),
  };
};

export default connect(mapStateToProps)(Favorites);

// <div className="favorite-card">
// {favoritesTown.map((item) => (
//   <div>
//     {" "}
//     <div className="location">{favoritesTown.name}</div>
//     <div className="date">
//       {" "}
//       <Moment format="dddd D MMMM  yyyy">
//         {item.LocalObservationDateTime}
//       </Moment>{" "}
//     </div>
//     <div className="weather-box">
//       <div className="temp">
//         {item.Temperature.Metric.Value} {item.Temperature.Metric.Unit}
//       </div>
//       {/* {item.Temperature.`${metric ? Metric : Imperial}`.Value} {item.Temperature.`${metric ? Metric : Imperial}`.Unit} */}
//       <div className="weather">{item.WeatherText}</div>
//     </div>
//   </div>
// ))}
// </div>
