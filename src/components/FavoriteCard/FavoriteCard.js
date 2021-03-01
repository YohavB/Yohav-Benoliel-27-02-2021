import axios from "axios";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { getMetric } from "../selectors/settings";
import "./FavoriteCard.css";
import { removeFavorite } from "../actions/data";
import { api } from "../api/api";

const data = [
  {
    LocalObservationDateTime: "2021-03-01T10:31:00+02:00",
    EpochTime: 1614587460,
    WeatherText: "A shower",
    WeatherIcon: 13,
    HasPrecipitation: true,
    PrecipitationType: "Rain",
    IsDayTime: true,
    Temperature: {
      Metric: {
        Value: 15.4,
        Unit: "C",
        UnitType: 17,
      },
      Imperial: {
        Value: 60,
        Unit: "F",
        UnitType: 18,
      },
    },
    MobileLink:
      "http://m.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
    Link:
      "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
  },
];

function FavoriteCard(props) {
  const [favoriteWeatherData, setFavoriteWeatherData] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setLoader(false);
  }, [favoriteWeatherData]);

  useEffect(() => {
    setFavoriteWeatherData(data);
  }, []);

  async function getCurrentWeather() {
    try {
      const res = await axios.get(
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
    } catch (e) {
      alert(`An Error has occured${e}`);
    }
  }

  const unit = props.metric ? "Metric" : "Imperial";

  return (
    <div className="wrapper">
      {loader ? (
        <div> LOADING </div>
      ) : (
        <div className="card">
          <button className="favbtn" onClick={removeFavorite}>
            FAV
          </button>
          <div className="location fav">{props.favoriteTownName}</div>
          <div className="date fav">
            {" "}
            <Moment format="dddd D MMMM  yyyy">
              {favoriteWeatherData[0].LocalObservationDateTime}
            </Moment>{" "}
          </div>
          <div className="weather-box fav">
            <div className="temp fav">
              {favoriteWeatherData[0].Temperature[unit].Value}{" "}
              {favoriteWeatherData[0].Temperature[unit].Unit}
            </div>

            <div className="weather fav">
              {favoriteWeatherData[0].WeatherText}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    metric: getMetric(state),
  };
};

const mapDispatchToProps = {
  removeFavorite,
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteCard);
