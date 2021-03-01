import React, { useState, useEffect } from "react";
import _ from "lodash"
import Moment from "react-moment";
import { connect } from "react-redux";
import {getFavorites, getTownID, getTownName, getWeatherData} from "../selectors/data"
import { getMetric } from "../selectors/settings";
import {removeFavorite, setFavorite} from "../actions/data"

import "./DailyWeather.css";

function DailyWeather(props) {
	const {weatherData, townName, townID, favorites} = props
  const [isFavorite, setIsFavorite] = useState(false);

	useEffect(() => {
		const isFav = favorites.find(item => item.townID === townID)
		setIsFavorite(!!isFav)
	}, [townID])

  const toggleFavorite = () => {
    const { setFavorite, removeFavorite } = props;
    if (!isFavorite) {
      setFavorite({townID, townName});
    } else {
      removeFavorite(townID);
    }
    setIsFavorite(!isFavorite);
  };

  const saveLocalFav = () => {
    localStorage.setItem("favorites-city", JSON.stringify(props.favorites));
  };

  const unit = props.metric ? "Metric" : "Imperial";
	if (_.isEmpty(weatherData)) {
		return null
	}
  return (
    <div>
      <div className="daily-wrapper">
            <div>
              <div className="location-box">
                <div className="fav-btn">
                  {" "}
                  <input
                    type="checkbox"
                    checked={isFavorite}
                    onChange={toggleFavorite}
                  />
                </div>
                <div className="location">{townName}</div>
                <div className="date">
                  {" "}
                  <Moment format="dddd D MMMM  yyyy">
                    {weatherData.LocalObservationDateTime}
                  </Moment>{" "}
                </div>
              </div>
              <div className="weather-box">
                <div className="temp">
	                {weatherData.Temperature[unit].Value} {weatherData.Temperature[unit].Unit}
                </div>
                <div className="weather">{weatherData.WeatherText}</div>
              </div>
            </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    weatherData: getWeatherData(state),
    metric: getMetric(state),
    townID: getTownID(state),
    townName: getTownName(state),
    favorites: getFavorites(state),
  };
};

const mapDispatchToProps = {
  setFavorite, removeFavorite,
};

export default connect(mapStateToProps, mapDispatchToProps)(DailyWeather);
