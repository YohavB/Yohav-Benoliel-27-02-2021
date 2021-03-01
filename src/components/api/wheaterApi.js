import axios from 'axios'
import {api} from "./api"

function fakeApi(res) {
	return new Promise(resolve => {
		resolve({data: res, status: 200})
	})
}

export function getCurrentWeatherAPI(townID) {
	return axios.get(
		`  ${api.base}/currentconditions/v1/${townID}?apikey=%09${api.key}`
	);
	return fakeApi([
		{
			"LocalObservationDateTime": "2021-03-01T21:16:00+02:00",
			"EpochTime": 1614626160,
			"WeatherText": "Mostly clear",
			"WeatherIcon": 10,
			"HasPrecipitation": false,
			"PrecipitationType": null,
			"IsDayTime": false,
			"Temperature": {
				"Metric": {
					"Value": 14.4,
					"Unit": "C",
					"UnitType": 17
				},
				"Imperial": {
					"Value": 58,
					"Unit": "F",
					"UnitType": 18
				}
			},
			"MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
			"Link": "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us"
		}
	])
}

export function autocompleteAPI(query) {
	return axios.get(
		`${api.base}/locations/v1/cities/autocomplete?apikey=%09${api.key}&q=${query}`
	);
	return fakeApi([
		{
			"Version": 1,
			"Key": "210841",
			"Type": "City",
			"Rank": 20,
			"LocalizedName": "Tehran",
			"Country": {
				"ID": "IR",
				"LocalizedName": "Iran"
			},
			"AdministrativeArea": {
				"ID": "07",
				"LocalizedName": "Tehran"
			}
		},
		{
			"Version": 1,
			"Key": "60592",
			"Type": "City",
			"Rank": 23,
			"LocalizedName": "Tengzhou",
			"Country": {
				"ID": "CN",
				"LocalizedName": "China"
			},
			"AdministrativeArea": {
				"ID": "SD",
				"LocalizedName": "Shandong"
			}
		},
		{
			"Version": 1,
			"Key": "188046",
			"Type": "City",
			"Rank": 30,
			"LocalizedName": "Tegucigalpa",
			"Country": {
				"ID": "HN",
				"LocalizedName": "Honduras"
			},
			"AdministrativeArea": {
				"ID": "FM",
				"LocalizedName": "Francisco Morazán"
			}
		},
		{
			"Version": 1,
			"Key": "45253",
			"Type": "City",
			"Rank": 31,
			"LocalizedName": "Teresina",
			"Country": {
				"ID": "BR",
				"LocalizedName": "Brazil"
			},
			"AdministrativeArea": {
				"ID": "PI",
				"LocalizedName": "Piauí"
			}
		},
		{
			"Version": 1,
			"Key": "215854",
			"Type": "City",
			"Rank": 31,
			"LocalizedName": "Tel Aviv",
			"Country": {
				"ID": "IL",
				"LocalizedName": "Israel"
			},
			"AdministrativeArea": {
				"ID": "TA",
				"LocalizedName": "Tel Aviv"
			}
		},
		{
			"Version": 1,
			"Key": "234337",
			"Type": "City",
			"Rank": 31,
			"LocalizedName": "Tepic",
			"Country": {
				"ID": "MX",
				"LocalizedName": "Mexico"
			},
			"AdministrativeArea": {
				"ID": "NAY",
				"LocalizedName": "Nayarit"
			}
		},
		{
			"Version": 1,
			"Key": "246100",
			"Type": "City",
			"Rank": 32,
			"LocalizedName": "Tetouan",
			"Country": {
				"ID": "MA",
				"LocalizedName": "Morocco"
			},
			"AdministrativeArea": {
				"ID": "01",
				"LocalizedName": "Tanger-Tétouan-Al Hoceïma"
			}
		},
		{
			"Version": 1,
			"Key": "61484",
			"Type": "City",
			"Rank": 33,
			"LocalizedName": "Tengchong",
			"Country": {
				"ID": "CN",
				"LocalizedName": "China"
			},
			"AdministrativeArea": {
				"ID": "YN",
				"LocalizedName": "Yunnan"
			}
		},
		{
			"Version": 1,
			"Key": "3558994",
			"Type": "City",
			"Rank": 35,
			"LocalizedName": "Tecámac",
			"Country": {
				"ID": "MX",
				"LocalizedName": "Mexico"
			},
			"AdministrativeArea": {
				"ID": "MEX",
				"LocalizedName": "México"
			}
		},
		{
			"Version": 1,
			"Key": "234828",
			"Type": "City",
			"Rank": 35,
			"LocalizedName": "Tehuacán",
			"Country": {
				"ID": "MX",
				"LocalizedName": "Mexico"
			},
			"AdministrativeArea": {
				"ID": "PUE",
				"LocalizedName": "Puebla"
			}
		}
	])
}

export function getWeatherByPositionAPI(lat, lon) {
	return axios.get(
		`  ${api.base}/locations/v1/cities/geoposition/search?apikey=${api.key}&q=${lat}%2C${lon}`
	);
	return fakeApi({
		"Version": 1,
		"Key": "215760",
		"Type": "City",
		"Rank": 95,
		"LocalizedName": "Nakahlat Yitskhak",
		"EnglishName": "Nakahlat Yitskhak",
		"PrimaryPostalCode": "",
		"Region": {
			"ID": "MEA",
			"LocalizedName": "Middle East",
			"EnglishName": "Middle East"
		},
		"Country": {
			"ID": "IL",
			"LocalizedName": "Israel",
			"EnglishName": "Israel"
		},
		"AdministrativeArea": {
			"ID": "TA",
			"LocalizedName": "Tel Aviv",
			"EnglishName": "Tel Aviv",
			"Level": 1,
			"LocalizedType": "District",
			"EnglishType": "District",
			"CountryID": "IL"
		},
		"TimeZone": {
			"Code": "IST",
			"Name": "Asia/Jerusalem",
			"GmtOffset": 2,
			"IsDaylightSaving": false,
			"NextOffsetChange": "2021-03-26T00:00:00Z"
		},
		"GeoPosition": {
			"Latitude": 32.077,
			"Longitude": 34.8,
			"Elevation": {
				"Metric": {
					"Value": 10,
					"Unit": "m",
					"UnitType": 5
				},
				"Imperial": {
					"Value": 32,
					"Unit": "ft",
					"UnitType": 0
				}
			}
		},
		"IsAlias": false,
		"ParentCity": {
			"Key": "215854",
			"LocalizedName": "Tel Aviv",
			"EnglishName": "Tel Aviv"
		},
		"SupplementalAdminAreas": [],
		"DataSets": [
			"AirQualityCurrentConditions",
			"AirQualityForecasts",
			"Alerts",
			"ForecastConfidence"
		]
	})
}

export function getForecastAPI(townID, metric) {
	return axios.get(
		`  ${api.base}/forecasts/v1/daily/5day/${townID}?apikey=%09${api.key}&metric=${metric}`
	);
	return fakeApi({
		"Headline": {
			"EffectiveDate": "2021-03-02T07:00:00+02:00",
			"EffectiveEpochDate": 1614661200,
			"Severity": 5,
			"Text": "Expect showers Tuesday",
			"Category": "rain",
			"EndDate": "2021-03-02T19:00:00+02:00",
			"EndEpochDate": 1614704400,
			"MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/extended-weather-forecast/215854?lang=en-us",
			"Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?lang=en-us"
		},
		"DailyForecasts": [
			{
				"Date": "2021-03-01T07:00:00+02:00",
				"EpochDate": 1614574800,
				"Temperature": {
					"Minimum": {
						"Value": 52,
						"Unit": "F",
						"UnitType": 18
					},
					"Maximum": {
						"Value": 65,
						"Unit": "F",
						"UnitType": 18
					}
				},
				"Day": {
					"Icon": 14,
					"IconPhrase": "Partly sunny w/ showers",
					"HasPrecipitation": true,
					"PrecipitationType": "Rain",
					"PrecipitationIntensity": "Light"
				},
				"Night": {
					"Icon": 34,
					"IconPhrase": "Mostly clear",
					"HasPrecipitation": false
				},
				"Sources": [
					"AccuWeather"
				],
				"MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us",
				"Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us"
			},
			{
				"Date": "2021-03-02T07:00:00+02:00",
				"EpochDate": 1614661200,
				"Temperature": {
					"Minimum": {
						"Value": 52,
						"Unit": "F",
						"UnitType": 18
					},
					"Maximum": {
						"Value": 65,
						"Unit": "F",
						"UnitType": 18
					}
				},
				"Day": {
					"Icon": 14,
					"IconPhrase": "Partly sunny w/ showers",
					"HasPrecipitation": true,
					"PrecipitationType": "Rain",
					"PrecipitationIntensity": "Light"
				},
				"Night": {
					"Icon": 35,
					"IconPhrase": "Partly cloudy",
					"HasPrecipitation": false
				},
				"Sources": [
					"AccuWeather"
				],
				"MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&lang=en-us",
				"Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&lang=en-us"
			},
			{
				"Date": "2021-03-03T07:00:00+02:00",
				"EpochDate": 1614747600,
				"Temperature": {
					"Minimum": {
						"Value": 51,
						"Unit": "F",
						"UnitType": 18
					},
					"Maximum": {
						"Value": 65,
						"Unit": "F",
						"UnitType": 18
					}
				},
				"Day": {
					"Icon": 14,
					"IconPhrase": "Partly sunny w/ showers",
					"HasPrecipitation": true,
					"PrecipitationType": "Rain",
					"PrecipitationIntensity": "Light"
				},
				"Night": {
					"Icon": 39,
					"IconPhrase": "Partly cloudy w/ showers",
					"HasPrecipitation": true,
					"PrecipitationType": "Rain",
					"PrecipitationIntensity": "Moderate"
				},
				"Sources": [
					"AccuWeather"
				],
				"MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&lang=en-us",
				"Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&lang=en-us"
			},
			{
				"Date": "2021-03-04T07:00:00+02:00",
				"EpochDate": 1614834000,
				"Temperature": {
					"Minimum": {
						"Value": 52,
						"Unit": "F",
						"UnitType": 18
					},
					"Maximum": {
						"Value": 62,
						"Unit": "F",
						"UnitType": 18
					}
				},
				"Day": {
					"Icon": 14,
					"IconPhrase": "Partly sunny w/ showers",
					"HasPrecipitation": true,
					"PrecipitationType": "Rain",
					"PrecipitationIntensity": "Light"
				},
				"Night": {
					"Icon": 34,
					"IconPhrase": "Mostly clear",
					"HasPrecipitation": false
				},
				"Sources": [
					"AccuWeather"
				],
				"MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&lang=en-us",
				"Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&lang=en-us"
			},
			{
				"Date": "2021-03-05T07:00:00+02:00",
				"EpochDate": 1614920400,
				"Temperature": {
					"Minimum": {
						"Value": 51,
						"Unit": "F",
						"UnitType": 18
					},
					"Maximum": {
						"Value": 67,
						"Unit": "F",
						"UnitType": 18
					}
				},
				"Day": {
					"Icon": 2,
					"IconPhrase": "Mostly sunny",
					"HasPrecipitation": false
				},
				"Night": {
					"Icon": 35,
					"IconPhrase": "Partly cloudy",
					"HasPrecipitation": false
				},
				"Sources": [
					"AccuWeather"
				],
				"MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&lang=en-us",
				"Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&lang=en-us"
			}
		]
	})
}
