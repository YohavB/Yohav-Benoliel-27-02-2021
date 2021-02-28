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

function Home() {
  const [query, setQuery] = useState("Tel Aviv");
  const [error, setError] = useState("");
  const [autoCompletion, setAutoCompletion] = useState(data);
  const [keyTown, setKeyTown] = useState("");
  const [forecastData, setforecastData] = useState(dailyForecast);
  const [weatherData, setWeatherData] = useState(dailyWeather);
  const [location, setLocation] = useState("Tel Aviv, Israel");
  const [mainBg, setMainBg] = useState(clear);
  const [metric, setMetric] = useState(true)
  const weatherNo = weatherData[0].WeatherIcon;

  // useEffect(() => {
  //   getCurrentWeather();
  // }, []);

  useEffect(() => {
    query && validateQuery();
    // if (!error && query) {
    //throttle(() => autocomplete(), 500)
    //
    // }
  }, [query]);

  useEffect(() => {
    bgSwitch();
  }, [weatherData]);

  const validateQuery = () => {
    if (!/^[a-zA-Z ]*$/i.test(query)) {
      setError("Sorry but only English letters are allowed !");
    } else {
      setError("");
    }
  };

  // working !!

  // async function autocomplete() {
  //   try {
  //     const res = await axios.get(
  //       `${api.base}/locations/v1/cities/autocomplete?apikey=%09${api.key}&q=${query}`
  //     );

  //     console.log(res.data);
  //     console.log(res.status);
  //     console.log(res.statusText);
  //     setAutoCompletion(res.data);
  //   } catch (e) {}
  // }

  // async function getForecast() {
  //   try {
  //     const res = axios.get(
  //       `  ${api.base}/forecasts/v1/daily/5day/${keyTown}?apikey=%09${api.key}&metric=${metric}`
  //     );

  //     console.log(res.data);
  //     console.log(res.status);
  //     console.log(res.statusText);
  //     setforecastData(res.data);
  //   } catch (e) {}
  // }

  // async function getCurrentWeather() {
  //   if (!error && query) {
  //     try {
  //       const res = axios.get(
  //         `  ${api.base}/currentconditions/v1/${keyTown}?apikey=%09${api.key}`
  //       );

  //       console.log(res.data);
  //       console.log(res.status);
  //       console.log(res.statusText);
  //       if (res.status === 200) {
  //         setWeatherData(res.data);
  //       } else {
  //         setError("An Error has occured");
  //       }
  //     } catch (e) {}
  //   } else if (!error && !query) {
  //     setError("The Search Field is Empty!");
  //   }
  //   setQuery("");
  // }

  function selectOption(option) {
    setQuery(option);
    // getCurrentWeather();
  }

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

  return (
    <div
      className="main"
      style={{
        backgroundImage: `url(${mainBg})`,
        transition: "all 1s ease-in",
      }}
    >
      {/* SEARCHBAR AND autoCompletion */}
      <div className="search-box">
        <input
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          type="text"
          className="search-bar"
          // onKeyDown={handleKey}
          placeholder="Search for a Country/City/Town"
        />

        <div className="autocomp-options">
          {autoCompletion &&
            autoCompletion.map((item) => {
              return (
                <div
                  className="autocomp-option"
                  key={item.key}
                  onClick={() => {
                    selectOption(item.LocalizedName);
                    setKeyTown(item.key);
                    setLocation(item.LocalizedName, item.Country.LocalizedName);
                  }}
                >
                  {item.LocalizedName}, {item.Country.LocalizedName}
                </div>
              );
            })}
        </div>
      </div>
      {error && <div className="error">{error}</div>}

      {/* DAILY WEATHER DATA */}
      <div className="daily-wrapper">
        {weatherData &&
          weatherData.map((item) => {
            return (
              <div>
                <div className="location-box">
                  <div className="fav-btn">FAV</div>
                  <div className="location">{location}</div>
                  <div className="date">
                    {" "}
                    <Moment format="dddd D MMMM  yyyy">{item.LocalObservationDateTime}</Moment>{" "}
                  </div>
                </div>
                <div className="weather-box">
                  <div className="temp">

                    {item.Temperature.Metric.Value}{" "}
                    {item.Temperature.Metric.Unit}
                  </div>
                  {/* {item.Temperature.`${metric ? Metric : Imperial}`.Value} {item.Temperature.`${metric ? Metric : Imperial}`.Unit} */}
                  <div className="weather">{item.WeatherText}</div>
                </div>
              </div>
            );
          })}
      </div>

      {/* FORECAST */}

      <div className="forecast">
        {forecastData &&
          forecastData.map((item) => {
            return (
              <div className="forecast-card" key={item.EpochDate}>
                <div className="forecast-date">
                  {" "}
                  <Moment format="dddd D MMMM  yyyy">{item.Date}</Moment>{" "}
                </div>
                <div className="forecast-temp">
                  <div className="min-temp">
                    Min <br />
                    {item.Temperature.Minimum.Value}
                    {item.Temperature.Minimum.Unit}
                  </div>{" "}
                  <div className="max-temp">
                    Max
                    <br />
                    {item.Temperature.Maximum.Value}
                    {item.Temperature.Maximum.Unit}
                  </div>
                </div>

                <div className="day-night">
                  <div className="day">{item.Day.IconPhrase}</div>
                  <div className="night">{item.Night.IconPhrase}</div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Home;
