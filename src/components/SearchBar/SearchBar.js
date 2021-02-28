import axios from "axios";
import { throttle } from "lodash";
import React, { useEffect, useState } from "react";

import { getWeatherData } from "../selectors/weatherData";
import { setWeatherData } from "../actions/weatherData";
import { getTownID } from "../selectors/townID";
import { setTownID } from "../actions/townID";
import { connect } from "react-redux";
import { api } from "../api/api";

function SearchBar(props) {
  const [query, setQuery] = useState("Tel Aviv");
  const [error, setError] = useState("");
  const [autoCompletion, setAutoCompletion] = useState();

  useEffect(() => {
    query && validateQuery();
    if (!error && query) {
      throttle(() => autocomplete(), 500);
    }
  }, [query]);

  const validateQuery = () => {
    if (!/^[a-zA-Z ]*$/i.test(query)) {
      setError("Sorry but only English letters are allowed !");
    } else {
      setError("");
    }
  };

  async function autocomplete() {
    try {
      const res = await axios.get(
        `${api.base}/locations/v1/cities/autocomplete?apikey=%09${api.key}&q=${query}`
      );

      console.log(res.data);
      console.log(res.status);
      console.log(res.statusText);
      setAutoCompletion(res.data);
    } catch (e) {}
  }

  async function getCurrentWeather() {
    if (!error && query) {
      try {
        const res = axios.get(
          `  ${api.base}/currentconditions/v1/${props.townID}?apikey=%09${api.key}`
        );

        console.log(res.data);
        console.log(res.status);
        console.log(res.statusText);
        if (res.status === 200) {
          setWeatherData(res.data); // redux
        } else {
          setError("An Error has occured");
        }
      } catch (e) {}
    } else if (!error && !query) {
      setError("The Search Field is Empty!");
    }
    setQuery("");
  }

  function selectOption(option) {
    setQuery(option);
    getCurrentWeather();
  }

  return (
    <div>
      <div className="search-box">
        <input
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          type="text"
          className="search-bar"
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
                    setTownID(item.key);
                    props.setLocation(
                      item.LocalizedName,
                      item.Country.LocalizedName
                    ); //redux
                  }}
                >
                  {item.LocalizedName}, {item.Country.LocalizedName}
                </div>
              );
            })}
        </div>
      </div>
      {error && <div className="error">{error}</div>}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    townID: getTownID(state),
    weatherData: getWeatherData(state),
  };
};

const mapDispatchToProps = {
  setWeatherData,
  setTownID,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
