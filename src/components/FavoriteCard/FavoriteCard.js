import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { getMetric } from "../../selectors/settings";
import { removeFavorite, setTownID, setTownName } from "../../actions/data";

import { getCurrentWeatherAPI } from "../api/wheaterApi";

import "./FavoriteCard.css";
import delete_icon from "../assets/delete.svg";
import NewLoader from "../Loader/Loader";

function FavoriteCard(props) {
  const [favoriteWeatherData, setFavoriteWeatherData] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    getCurrentWeather();
  }, []);

  async function getCurrentWeather() {
    try {
      const res = await getCurrentWeatherAPI(props.favoriteTownID);
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

  const setCurrentTown = () => {
    props.setTownID(props.favoriteTownID);
    props.setTownName(props.favoriteTownName);
  };

  const unit = props.metric ? "Metric" : "Imperial";

  return (
    <div className="wrapper">
      {loader ? (
        <div>
          <NewLoader type="TailSpin" color="#2196f3" width={50} height={50} />
        </div>
      ) : (
        <div className="card">
          <img
            className="delete-icon"
            src={delete_icon}
            alt="delete"
            onClick={() => props.removeFavorite(props.favoriteTownID)}
          />

          <Link to="/" onClick={setCurrentTown}>
            <div className="location fav">{props.favoriteTownName}</div>
            <div className="date fav">
              {" "}
              <Moment format="dddd D MMMM  yyyy">
                {favoriteWeatherData.LocalObservationDateTime}
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
          </Link>
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
  setTownID,
  setTownName,
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteCard);
