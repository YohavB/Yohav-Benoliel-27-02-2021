import React, { useState, useEffect } from "react";
import Moment from "react-moment";

import { connect } from "react-redux";
import { getTownID } from "../../selectors/data";
import { getMetric } from "../../selectors/settings";

import { getForecastAPI } from "../api/wheaterApi";

import "./Forecast.css";

function Forecast(props) {
  const [forecastData, setforecastData] = useState([]);
  const { townID, metric } = props;
  useEffect(() => {
    getForecast();
  }, [townID, metric]);

  async function getForecast() {
    const { townID, metric } = props;
    try {
      const res = await getForecastAPI(townID, metric);
      setforecastData(res.data.DailyForecasts);
    } catch (e) {}
  }

  return (
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
  );
}

const mapStateToProps = (state) => {
  return {
    townID: getTownID(state),
    metric: getMetric(state),
  };
};

export default connect(mapStateToProps)(Forecast);
