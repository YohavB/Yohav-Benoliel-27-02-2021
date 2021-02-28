import React, { useState } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { getWeatherData } from "../selectors/weatherData";
import { setFavorite } from "../actions/favorites";

import "./DailyWeather.css";

function DailyWeather(props, location) {
  const [isFavorite, setIsFavorite] = useState(false); // get and set from redux

  const toggleFavorite = () => {
    const { setFavorite, removeFavorite, id } = props;
    if (!isFavorite) {
      setFavorite(id);
    } else {
      removeFavorite(id);
    }
    setIsFavorite(!isFavorite);
  };

  const saveLocalFav = () => {
    localStorage.setItem("favorites-city", JSON.stringify(props.favorites)); // get from redux
  };

  const unit = props.unit ? "Metric" : "Imperial";

  return (
    <div>
      <div className="daily-wrapper">
        {props.getWeatherData.map((item) => {
          //  props.weatherData.map, pas getWeatherData DONE
          return (
            <div>
              <div className="location-box">
                <div className="fav-btn">
                  {" "}
                  <input
                    type="checkbox"
                    checked={
                      toggleFavorite /* TODO c cense etre un boolean, pas une fonction || ?? */
                    }
                    onChange={toggleFavorite}
                  />
                </div>
                <div className="location">{location}</div>
                <div className="date">
                  {" "}
                  <Moment format="dddd D MMMM  yyyy">
                    {item.LocalObservationDateTime}
                  </Moment>{" "}
                </div>
              </div>
              <div className="weather-box">
                <div className="temp">
                  {item.Temperature.Metric.Value} {item.Temperature.Metric.Unit}
                </div>
                {item.Temperature[unit].Value} {item.Temperature[unit].Unit}
                <div className="weather">{item.WeatherText}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    weatherData: getWeatherData(state),
  };
};

const mapDispatchToProps = {
  setFavorite,
};

export default connect(mapStateToProps, mapDispatchToProps)(DailyWeather);
