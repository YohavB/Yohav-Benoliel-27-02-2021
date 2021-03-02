import React, { useEffect, useState } from "react";
import _ from "lodash";

import { connect } from "react-redux";
import { setTownName, setWeatherData } from "../../actions/data";
import { setTownID } from "../../actions/data";
import { getMetric } from "../../selectors/settings";
import { getTownID } from "../../selectors/data";

import {
  autocompleteAPI,
  getCurrentWeatherAPI,
  getWeatherByPositionAPI,
} from "../api/wheaterApi";

import "./SearchBar.css";

function SearchBar(props) {
  const { lat, lon, townID, setLat, setLon } = props;
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [autoCompletion, setAutoCompletion] = useState([]);

  useEffect(() => {
    if (lat && lon) {
      getPositionWeather();
    } else {
      getCurrentWeather();
    }
  }, []);

  useEffect(() => {
    getCurrentWeather();
    setLat(null);
    setLon(null);
  }, [townID]);

  useEffect(() => {
    query && validateQuery();
    if (!error && query) {
      // _.debounce(autocomplete, 500);
      autocomplete();
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
      const res = await autocompleteAPI(query);
      setAutoCompletion(res.data);
    } catch (e) {}
  }

  async function getCurrentWeather() {
    if (!error) {
      try {
        const res = await getCurrentWeatherAPI(props.townID);
        if (res.status === 200) {
          props.setWeatherData(res.data[0]);
        } else {
          setError("An Error has occured");
        }
      } catch (e) {
        setError(`An Error has occured, ${e}`);
      }
    }
    setQuery("");
  }

  async function getPositionWeather() {
    try {
      const res = await getWeatherByPositionAPI(lat, lon);

      if (res.status === 200) {
        props.setTownID(res.data.Key);
        props.setTownName(
          `${res.data.LocalizedName}, ${res.data.Country.LocalizedName}`
        );
        getCurrentWeather();
      } else {
        setError("An Error has occured");
      }
    } catch (e) {
      setError(`An Error has occured, ${e}`);
    }

    setQuery("");
  }

  const onOptionClick = (item) => {
    props.setTownID(item.Key);
    props.setTownName(`${item.LocalizedName}, ${item.Country.LocalizedName}`);
  };

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
          {query &&
            autoCompletion.map((item) => {
              return (
                <div
                  className="autocomp-option"
                  key={item.key}
                  onClick={() => {
                    onOptionClick(item);
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
    metric: getMetric(state),
  };
};

const mapDispatchToProps = {
  setWeatherData,
  setTownID,
  setTownName,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
