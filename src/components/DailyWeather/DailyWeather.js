import React, { useState } from "react";
import Moment from "react-moment";
import "./Dailyweather.css";

export default function DailyWeather(weatherData, location) {
  const [isFavorite, setIsFavorite] = useState(false);
  return (
    <div>
      <div className="daily-wrapper">
        {weatherData &&
          weatherData.map((item) => {
            return (
              <div>
                <div className="location-box">
                  <div className="fav-btn">
                    {" "}
                    <input
                      type="checkbox"
                      checked={setIsFavorite(true)}
                      onChange={setIsFavorite(true)}
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
    </div>
  );
}
