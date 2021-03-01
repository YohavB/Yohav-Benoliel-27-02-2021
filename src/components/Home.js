import React, { useEffect, useState } from "react";
import clear from "./assets/clear.jpg";
import clouds from "./assets/clouds.jpg";
import rainy from "./assets/rainy.jpg";
import snow from "./assets/snow.jpg";
import storm from "./assets/storm.jpg";
import sun from "./assets/sun.jpg";

import {getFavorites, getTownID, getWeatherData} from "./selectors/data"
import {populateFavorites, setFavorite} from "./actions/data"
import { connect } from "react-redux";

import Forecast from "./Forecast/Forecast";
import DailyWeather from "./DailyWeather/DailyWeather";
import SearchBar from "./SearchBar/SearchBar";

function Home(props) {
  const [mainBg, setMainBg] = useState(clear);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const weatherNo = props.weatherData.WeatherIcon;

  useEffect(() => {
	  getLatitudeLongitude();
  }, []);

  useEffect(() => {
    bgSwitch();
  }, [weatherNo]);

  function getLatitudeLongitude() {
	  var options = {
		  enableHighAccuracy: true,


		  
		  timeout: 10,
		  maximumAge: 0,
	  };

	  function success(pos) {
		  const lat = pos.coords.latitude;
		  const lon = pos.coords.longitude;
		  setLat(lat);
		  setLon(lon);
	  }

	  function error(err) {
		  console.warn(`ERROR(${err.code}): ${err.message}`);
		  setLat(32.0853);
		  setLon(34.7818);
	  }

	  navigator.geolocation.getCurrentPosition(success, error, options);
  }

  const bgSwitch = () => {
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
if ((!lat || !lon) && !props.townID) {
	return null;
}
  return (
    <div
      className="main"
      style={{
        backgroundImage: `url(${mainBg})`,
        transition: "all 1s ease-in",
      }}
    >
      <SearchBar lat={lat} lon={lon} setLat={setLat} setLon={setLon} />
      <DailyWeather />
      <Forecast />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    weatherData: getWeatherData(state),
	  townID: getTownID(state),
  };
};

export default connect(mapStateToProps)(Home);
