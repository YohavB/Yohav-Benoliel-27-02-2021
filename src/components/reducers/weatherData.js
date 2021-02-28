import { SET_WEATHER_DATA } from "../actions/data";

const initialState = {
    weatherData: [],
};

 const weatherData =(state = initialState, action) =>{
  switch (action.type) {
    case SET_WEATHER_DATA:
      return {
        ...state,
        weatherData: [...state.weatherData, action.id],
      };
  
    default:
      return state;
  }
}
export default weatherData