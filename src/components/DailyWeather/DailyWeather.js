import React, { useState } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { getWeatherData } from "../selectors/data";
import { getMetric } from "../selectors/settings";
import { setFavorite } from "../actions/data";

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
    localStorage.setItem("favorites-city", JSON.stringify(props.favorites));
  };

  const unit = props.metric ? "Metric" : "Imperial";

  return (
    <div>
      <div className="daily-wrapper">
        {props.getWeatherData[0].map((item) => {
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
    metric: getMetric(state),
  };
};

const mapDispatchToProps = {
  setFavorite,
};

export default connect(mapStateToProps, mapDispatchToProps)(DailyWeather);
