import React, { useEffect, useState } from "react";
import clear from "./assets/clear.jpg";
import clouds from "./assets/clouds.jpg";
import rainy from "./assets/rainy.jpg";
import snow from "./assets/snow.jpg";
import storm from "./assets/storm.jpg";
import sun from "./assets/sun.jpg";

import { getFavorites } from "./selectors/data";
import { getWeatherData } from "./selectors/data";
import { setFavorite } from "./actions/data";
import { connect } from "react-redux";

import Forecast from "./Forecast/Forecast";
import DailyWeather from "./DailyWeather/DailyWeather";
import SearchBar from "./SearchBar/SearchBar";

function Home(props) {
  const [location, setLocation] = useState("");
  const [mainBg, setMainBg] = useState(clear);
  const weatherNo = props.getWeatherData; //  c pour recup le number donne par lAPI pour changer le bg

  useEffect(() => {
    bgSwitch();
  }, [weatherNo]);

  useEffect(() => {
    getLocalFav();
  }, []);

  const getLocalFav = () => {
    if (localStorage.getItem("favorites-city") === null) {
      localStorage.setItem("favorites-city", JSON.stringify([])); //  pourquoi? je verifie si il existe dans le local sinon je creer un json
    } else {
      let favLocal = JSON.parse(localStorage.getItem("favorites-city"));
      props.setFavorite(favLocal); // DONE ca marche pas pck ca doit etre props.setFavorite
    }
  };

  const bgSwitch = () => {
    // if done
    if (weatherNo < 5) {
      setMainBg(sun);
    } else if (weatherNo < 11) {
      setMainBg(clouds);
    } else if (weatherNo < 14 || weatherNo === 18) {
      setMainBg(rainy);
    } else if (weatherNo < 29) {
      setMainBg(snow);
    } else if (weatherNo < 17) {
      setMainBg(storm);
    } else {
      setMainBg(clear);
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
    favorites: getFavorites(state), //  tu l utilise pas || ca faut que je le mette dans le local storge
    weatherData: getWeatherData(state), //  tu l utilise pas non plus || si pour savoir quel bg utiliser
  };
};

const mapDispatchToProps = {
  setFavorite, //  pk besoin de favorite dans la home? pcq je le set avec le useeffect des que lappli monte
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
