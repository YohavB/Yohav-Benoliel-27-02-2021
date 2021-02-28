import React, { useEffect, useState } from "react";
import axios from "axios";
import throttle from "lodash/throttle";
import Moment from "react-moment";
import clear from "./assets/clear.jpg";
import clouds from "./assets/clouds.jpg";
import rainy from "./assets/rainy.jpg";
import snow from "./assets/snow.jpg";
import storm from "./assets/storm.jpg";
import sun from "./assets/sun.jpg";

import { getFavorites } from "./selectors/favorites";
import { setFavorite, removeFavorite } from "./actions/favorites";
import { connect, useSelector } from "react-redux";
import Forecast from "./Forecast/Forecast";
import DailyWeather from "./DailyWeather/DailyWeather";
import SearchBar from "./SearchBar/SearchBar";

const data = [
  {
    Version: 1,
    Key: "215854",
    Type: "City",
    Rank: 31,
    LocalizedName: "Tel Aviv",
    Country: {
      ID: "IL",
      LocalizedName: "Israel",
    },
    AdministrativeArea: {
      ID: "TA",
      LocalizedName: "Tel Aviv",
    },
  },
  {
    Version: 1,
    Key: "3431644",
    Type: "City",
    Rank: 45,
    LocalizedName: "Telanaipura",
    Country: {
      ID: "ID",
      LocalizedName: "Indonesia",
    },
    AdministrativeArea: {
      ID: "JA",
      LocalizedName: "Jambi",
    },
  },
  {
    Version: 1,
    Key: "300558",
    Type: "City",
    Rank: 45,
    LocalizedName: "Telok Blangah New Town",
    Country: {
      ID: "SG",
      LocalizedName: "Singapore",
    },
    AdministrativeArea: {
      ID: "05",
      LocalizedName: "South West",
    },
  },
  {
    Version: 1,
    Key: "325876",
    Type: "City",
    Rank: 51,
    LocalizedName: "Telford",
    Country: {
      ID: "GB",
      LocalizedName: "United Kingdom",
    },
    AdministrativeArea: {
      ID: "TFW",
      LocalizedName: "Telford and Wrekin",
    },
  },
  {
    Version: 1,
    Key: "169072",
    Type: "City",
    Rank: 51,
    LocalizedName: "Telavi",
    Country: {
      ID: "GE",
      LocalizedName: "Georgia",
    },
    AdministrativeArea: {
      ID: "KA",
      LocalizedName: "Kakheti",
    },
  },
  {
    Version: 1,
    Key: "230611",
    Type: "City",
    Rank: 51,
    LocalizedName: "Telsiai",
    Country: {
      ID: "LT",
      LocalizedName: "Lithuania",
    },
    AdministrativeArea: {
      ID: "TE",
      LocalizedName: "Telšiai",
    },
  },
  {
    Version: 1,
    Key: "2723742",
    Type: "City",
    Rank: 55,
    LocalizedName: "Telégrafo",
    Country: {
      ID: "BR",
      LocalizedName: "Brazil",
    },
    AdministrativeArea: {
      ID: "PA",
      LocalizedName: "Pará",
    },
  },
  {
    Version: 1,
    Key: "186933",
    Type: "City",
    Rank: 55,
    LocalizedName: "Tela",
    Country: {
      ID: "HN",
      LocalizedName: "Honduras",
    },
    AdministrativeArea: {
      ID: "AT",
      LocalizedName: "Atlántida",
    },
  },
  {
    Version: 1,
    Key: "3453754",
    Type: "City",
    Rank: 55,
    LocalizedName: "Telaga Asih",
    Country: {
      ID: "ID",
      LocalizedName: "Indonesia",
    },
    AdministrativeArea: {
      ID: "JB",
      LocalizedName: "West Java",
    },
  },
  {
    Version: 1,
    Key: "3453755",
    Type: "City",
    Rank: 55,
    LocalizedName: "Telagamurni",
    Country: {
      ID: "ID",
      LocalizedName: "Indonesia",
    },
    AdministrativeArea: {
      ID: "JB",
      LocalizedName: "West Java",
    },
  },
];

const dailyWeather = [
  {
    LocalObservationDateTime: "2021-02-25T11:06:00+02:00",
    EpochTime: 1614243960,
    WeatherText: "Mostly sunny",
    WeatherIcon: 2,
    HasPrecipitation: false,
    PrecipitationType: null,
    IsDayTime: true,
    Temperature: {
      Metric: {
        Value: 18.8,
        Unit: "C",
        UnitType: 17,
      },
      Imperial: {
        Value: 66,
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

const dailyForecast = [
  {
    Date: "2021-02-25T07:00:00+02:00",
    EpochDate: 1614229200,
    Temperature: {
      Minimum: {
        Value: 10.1,
        Unit: "C",
        UnitType: 17,
      },
      Maximum: {
        Value: 19.3,
        Unit: "C",
        UnitType: 17,
      },
    },
    Day: {
      Icon: 2,
      IconPhrase: "Mostly sunny",
      HasPrecipitation: false,
    },
    Night: {
      Icon: 33,
      IconPhrase: "Clear",
      HasPrecipitation: false,
    },
    Sources: ["AccuWeather"],
    MobileLink:
      "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&unit=c&lang=en-us",
    Link:
      "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&unit=c&lang=en-us",
  },
  {
    Date: "2021-02-26T07:00:00+02:00",
    EpochDate: 1614315600,
    Temperature: {
      Minimum: {
        Value: 11.9,
        Unit: "C",
        UnitType: 17,
      },
      Maximum: {
        Value: 20.4,
        Unit: "C",
        UnitType: 17,
      },
    },
    Day: {
      Icon: 1,
      IconPhrase: "Sunny",
      HasPrecipitation: false,
    },
    Night: {
      Icon: 33,
      IconPhrase: "Clear",
      HasPrecipitation: false,
    },
    Sources: ["AccuWeather"],
    MobileLink:
      "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&unit=c&lang=en-us",
    Link:
      "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&unit=c&lang=en-us",
  },
  {
    Date: "2021-02-27T07:00:00+02:00",
    EpochDate: 1614402000,
    Temperature: {
      Minimum: {
        Value: 11.2,
        Unit: "C",
        UnitType: 17,
      },
      Maximum: {
        Value: 21.3,
        Unit: "C",
        UnitType: 17,
      },
    },
    Day: {
      Icon: 1,
      IconPhrase: "Sunny",
      HasPrecipitation: false,
    },
    Night: {
      Icon: 33,
      IconPhrase: "Clear",
      HasPrecipitation: false,
    },
    Sources: ["AccuWeather"],
    MobileLink:
      "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&unit=c&lang=en-us",
    Link:
      "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&unit=c&lang=en-us",
  },
  {
    Date: "2021-02-28T07:00:00+02:00",
    EpochDate: 1614488400,
    Temperature: {
      Minimum: {
        Value: 13.8,
        Unit: "C",
        UnitType: 17,
      },
      Maximum: {
        Value: 19.6,
        Unit: "C",
        UnitType: 17,
      },
    },
    Day: {
      Icon: 2,
      IconPhrase: "Mostly sunny",
      HasPrecipitation: false,
    },
    Night: {
      Icon: 35,
      IconPhrase: "Partly cloudy",
      HasPrecipitation: false,
    },
    Sources: ["AccuWeather"],
    MobileLink:
      "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&unit=c&lang=en-us",
    Link:
      "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&unit=c&lang=en-us",
  },
  {
    Date: "2021-03-01T07:00:00+02:00",
    EpochDate: 1614574800,
    Temperature: {
      Minimum: {
        Value: 12.7,
        Unit: "C",
        UnitType: 17,
      },
      Maximum: {
        Value: 19.2,
        Unit: "C",
        UnitType: 17,
      },
    },
    Day: {
      Icon: 14,
      IconPhrase: "Partly sunny w/ showers",
      HasPrecipitation: true,
      PrecipitationType: "Rain",
      PrecipitationIntensity: "Light",
    },
    Night: {
      Icon: 40,
      IconPhrase: "Mostly cloudy w/ showers",
      HasPrecipitation: true,
      PrecipitationType: "Rain",
      PrecipitationIntensity: "Light",
    },
    Sources: ["AccuWeather"],
    MobileLink:
      "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&unit=c&lang=en-us",
    Link:
      "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&unit=c&lang=en-us",
  },
];

const api = {
  key: "Z36jjcGxPOXXuoGe24FvPqG9zV70cYuk",
  base: "http://dataservice.accuweather.com",
};

function Home(props) {
  const [keyTown, setKeyTown] = useState("");
  const [location, setLocation] = useState("Tel Aviv, Israel");
  const [mainBg, setMainBg] = useState(clear);
  const [isFavorite, setIsFavorite] = useState(false);
  const weatherNo = weatherData[0].WeatherIcon;

  // useEffect(() => {
  //   getCurrentWeather();
  // }, []);

  useEffect(() => {
    bgSwitch();
  }, [weatherData]);

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

  // const handleKey = (event) => {
  //   if (event.key === "Enter") {
  //     getCurrentWeather();
  //   }
  // };

  // const saveLocalFav = () => {
  //   localStorage.setItem("favcity", JSON.stringify(favcity));
  // };

  // const getLocalFav = () => {
  //   if (localStorage.getItem("favcity") === null) {
  //     localStorage.setItem("favcity", JSON.stringify([]));
  //   } else {
  //     let favLocal = JSON.parse(localStorage.getItem("favcity"));
  //     setFav(favLocal);
  //   }
  // };

  const toggleFavorite = () => {
    const { setFavorite, removeFavorite, id } = props;
    if (!isFavorite) {
      setFavorite(id);
    } else {
      removeFavorite(id);
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <div
      className="main"
      style={{
        backgroundImage: `url(${mainBg})`,
        transition: "all 1s ease-in",
      }}
    >
      <SearchBar />
      <DailyWeather location={location} />
      <Forecast />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    favorites: getFavorites(state),
  };
};

const mapDispatchToProps = {
  setFavorite,
  removeFavorite,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
