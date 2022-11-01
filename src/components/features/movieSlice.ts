import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Movie } from "../../redux/types/ActionTypes";
import { axiosCall } from "../utils/api";

type returnError = {
  message: string;
};

interface MovieState {
  movies: Movie[];
  details: object;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: MovieState = {
  movies: [],
  details: {},
  status: "idle",
  error: null,
};

export const createMovie = createAsyncThunk<
  Movie[],
  {},
  { rejectValue: returnError }
>("movie/create", async (payload, thunkAPI) => {
  const response = await axiosCall("/movie", "POST", payload);
  return response.data as Movie[];
});

export const getMovies = createAsyncThunk<
  Movie[],
  string,
  { rejectValue: returnError }
>("movies/fetch", async () => {
  const response = await axiosCall("/movies", "GET");
  return response.data as Movie[];
});

export const getMovieDetails = createAsyncThunk<
  Movie,
  string,
  { rejectValue: returnError }
>("movie/details", async (id: string, thunkAPI) => {
  const response = await axiosCall(`/movie/${id}`, "GET");
  if (!response.status) {
    return thunkAPI.rejectWithValue({
      message: "Failed to fetch movie details.",
    });
  }
  return response.data as Movie;
});

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createMovie.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(createMovie.fulfilled, (state, { payload }) => {
      state.status = "idle";
    });

    builder.addCase(createMovie.rejected, (state, { payload }) => {
      if (payload) state.error = payload.message;
      state.status = "idle";
    });

    builder.addCase(getMovies.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(getMovies.fulfilled, (state, { payload }) => {
      state.movies = payload;
      state.status = "idle";
    });

    builder.addCase(getMovies.rejected, (state, { payload }) => {
      if (payload) state.error = payload.message;
      state.status = "idle";
    });

    builder.addCase(getMovieDetails.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(getMovieDetails.fulfilled, (state, { payload }) => {
      state.details = payload;
      state.status = "idle";
    });

    builder.addCase(getMovieDetails.rejected, (state, { payload }) => {
      if (payload) state.error = payload.message;
      state.status = "idle";
    });
  },
});

export default movieSlice.reducer;
