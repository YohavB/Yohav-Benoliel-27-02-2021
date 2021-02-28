import axios from "axios";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { removeFavorite } from "../actions/favorites";
import { api } from "../api/api";

function FavoriteCard(props) {
  const [favoriteWeatherData, setFavoriteWeatherData] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    getCurrentWeather();
  }, [favoriteWeatherData]);

  async function getCurrentWeather() {
    try {
      const res = axios.get(
        `  ${api.base}/currentconditions/v1/${props.favoriteTownID}?apikey=%09${api.key}`
      );
      console.log(res.data);
      console.log(res.status);
      console.log(res.statusText);
      if (res.status === 200) {
        setFavoriteWeatherData(res.data);
        setLoader(false);
      } else {
        alert("An Error has occured");
      }
    } catch (e) {}
  }

  const unit = props.unit ? "Metric" : "Imperial"; //get from redux

  return (
    <div>
      {loader ? (
        <div> LOADING </div>
      ) : (
        <div>
          <button onClick={removeFavorite}>FAV</button>
          <div className="location">{favoriteWeatherData.name}</div>
          <div className="date">
            {" "}
            <Moment format="dddd D MMMM  yyyy">
              {favoriteWeatherData.LocalObservationDateTime}
            </Moment>{" "}
          </div>
          <div className="weather-box">
            <div className="temp">
              {favoriteWeatherData.Temperature.Metric.Value}{" "}
              {favoriteWeatherData.Temperature.Metric.Unit}
            </div>
            {favoriteWeatherData.Temperature[unit].Value}{" "}
            {favoriteWeatherData.Temperature[unit].Unit}
            <div className="weather">{favoriteWeatherData.WeatherText}</div>
          </div>
        </div>
      )}
    </div>
  );
}

const mapDispatchToProps = {
  removeFavorite,
};

export default connect(null, mapDispatchToProps)(FavoriteCard);
