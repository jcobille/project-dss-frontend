import { Movie } from "./ActionTypes";

export const SET_MOVIES = "SET_MOVIES";

export interface SetMovieAction {
  type: typeof SET_MOVIES;
  movies: Movie[];
}

export type MovieActionTypes = SetMovieAction;