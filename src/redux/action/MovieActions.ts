import { Dispatch } from "redux";
import { axiosCall } from "../../components/utils/api";
import { getUserId, setCookie } from "../../components/utils/cookie";
import { AppState } from "../../store/configureStore";
import { Movie } from "../types/ActionTypes";
import { AppActions } from "../types";

export const setMovies = (movies: Movie[]): AppActions => ({
  type: "SET_MOVIES",
  movies,
});

export const startSetMovies = () => {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    axiosCall("/movies", "GET").then((res) => {
      dispatch(setMovies(res.data));
    });
  };
};

export const startGetMovieDetails = (id?: string) => {
  return axiosCall(`/movie/${id}`, "GET").then((res) => {
    return res.data;
  });
};
