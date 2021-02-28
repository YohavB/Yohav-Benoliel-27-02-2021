import React, { useEffect, useState } from "react";
import clear from "./assets/clear.jpg";
import clouds from "./assets/clouds.jpg";
import rainy from "./assets/rainy.jpg";
import snow from "./assets/snow.jpg";
import storm from "./assets/storm.jpg";
import sun from "./assets/sun.jpg";

import { getFavorites } from "./selectors/favorites";
import { getWeatherData } from "./selectors/weatherData";
import { setFavorite } from "./actions/favorites";
import { connect } from "react-redux";

import Forecast from "./Forecast/Forecast";
import DailyWeather from "./DailyWeather/DailyWeather";
import SearchBar from "./SearchBar/SearchBar";

function Home(props) {
  const [location, setLocation] = useState("");
  const [mainBg, setMainBg] = useState(clear);
  const weatherNo = getWeatherData.WeatherIcon;

  useEffect(() => {
    bgSwitch();
  }, [getWeatherData]); // get from redux

  useEffect(() => {
    getLocalFav();
  }, []);

  const getLocalFav = () => {
    if (localStorage.getItem("favorites-city") === null) {
      localStorage.setItem("favorites-city", JSON.stringify([]));
    } else {
      let favLocal = JSON.parse(localStorage.getItem("favorites-city"));
      setFavorite(favLocal); // set from redux
    }
  };

  const bgSwitch = () => {
    switch (true) {
      case weatherNo < 5:
        return setMainBg(sun);
      case weatherNo < 11:
        return setMainBg(clouds);
      case weatherNo < 14 || weatherNo === 18:
        return setMainBg(rainy);
      case weatherNo < 29:
        return setMainBg(snow);
      case weatherNo < 17:
        return setMainBg(storm);
      default:
        return setMainBg(clear);
    }
  };

  return (
    <div
      className="main"
      style={{
        backgroundImage: `url(${mainBg})`,
        transition: "all 1s ease-in",
      }}
    >
      <SearchBar setLocation={setLocation} />
      <DailyWeather location={location} />
      <Forecast />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    favorites: getFavorites(state),
    weatherData: getWeatherData(state),
  };
};

const mapDispatchToProps = {
  setFavorite,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
