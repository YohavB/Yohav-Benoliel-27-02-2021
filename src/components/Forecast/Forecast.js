import React from "react";
import Moment from "react-moment";
import "./Forecast.css";

export default function Forecast() {

  const [forecastData, setforecastData] = useState(dailyForecast);

  
  async function getForecast() {
    try {
      const res = axios.get(
        `  ${api.base}/forecasts/v1/daily/5day/${keyTown}?apikey=%09${api.key}&metric=${metric}`
      );

      console.log(res.data);
      console.log(res.status);
      console.log(res.statusText);
      setforecastData(res.data);
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
