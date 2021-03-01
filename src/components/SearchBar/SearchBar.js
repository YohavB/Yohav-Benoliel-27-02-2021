import axios from "axios";
import _ from "lodash";
import React, { useEffect, useState } from "react";

import "./SearchBar.css";

import {setTownName, setWeatherData} from "../actions/data"
import { getMetric } from "../selectors/settings";
import { getTownID } from "../selectors/data";
import { setTownID } from "../actions/data";
import { connect } from "react-redux";
import { api } from "../api/api";
import {autocompleteAPI, getCurrentWeatherAPI, getWeatherByPositionAPI} from "../api/wheaterApi"

function SearchBar(props) {
	const {lat, lon, townID, setLat, setLon} = props
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [autoCompletion, setAutoCompletion] = useState([]);

  useEffect(() => {
    if (lat && lon) {
      getPositionWeather();
    } else {
	    getCurrentWeather()
    }
  }, []);

  useEffect(() => {
	  getCurrentWeather()
	  setLat(null)
	  setLon(null)
  }, [townID]);

  useEffect(() => {
    query && validateQuery();
    if (!error && query) {
	    // _.debounce(autocomplete, 500); TODO s'occuper de ca
	    autocomplete()
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
  	console.log("autocomplete")
    try {
      const res = await autocompleteAPI(query)

      console.log(res.data);
      console.log(res.status);
      console.log(res.statusText);
      setAutoCompletion(res.data);
    } catch (e) {}
  }

  async function getCurrentWeather() {
    if (!error) {
      try {
        const res = await getCurrentWeatherAPI(props.townID)

        console.log(res.data);
        console.log(res.status);
        console.log(res.statusText);
        if (res.status === 200) {
          props.setWeatherData(res.data[0]);
          // props.setTownName(res.data.LocalizedName) //
        } else {
          setError("An Error has occured");
        }
      } catch (e) {
        setError(`An Error has occured, ${e}`);
      }
    // } else if (!error && !query) {
    //   setError("The Search Field is Empty!");
    }
    setQuery("");
  }

  async function getPositionWeather() {
    try {
      const res = await getWeatherByPositionAPI(lat, lon);
      console.log(res.data);
      console.log(res.status);
      console.log(res.statusText);
      if (res.status === 200) {
        props.setTownID(res.data.Key);
        props.setTownName(`${res.data.LocalizedName}, ${res.data.Country.LocalizedName}`)
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
