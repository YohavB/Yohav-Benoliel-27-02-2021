import { SET_FAVORITE, REMOVE_FAVORITE } from "../actions/favorites";

const initialState = {
  favorites: [],
};

 const favorites =(state = initialState, action) =>{
  switch (action.type) {
    case SET_FAVORITE:
      return {
        ...state,
        favorites: [...state.favorites, action.id],
      };
    case REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.find((id) => id !== action.id),
      };
    default:
      return state;
  }
}
export default favorites