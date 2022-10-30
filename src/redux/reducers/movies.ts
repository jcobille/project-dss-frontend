import { MovieActionTypes } from "../types/MovieInterface";
import { Movie } from "../types/ActionTypes";

const movieReducerDefaultState: Movie[] = [];
const movieReducer = (
  state = movieReducerDefaultState,
  action: MovieActionTypes
): Movie[] => {
  switch (action.type) {
    case "SET_MOVIES":
      return action.movies;
    default:
      return state;
  }
};

export { movieReducer };
