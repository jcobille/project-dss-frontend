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
  Movie,
  Movie,
  { rejectValue: returnError }
>("movie/create", async (payload, thunkAPI) => {
  const response = await axiosCall("/movie", "POST", payload);
  if (!response.status) {
    return thunkAPI.rejectWithValue({
      message: response.message,
    });
  }
  return response.data as Movie;
});

export const editMovie = createAsyncThunk<
  Movie,
  { id: string; image: string; cost: string; description: string },
  { rejectValue: returnError }
>("movie/edit", async (payload, thunkAPI) => {
  const response = await axiosCall(`/movie/${payload.id}`, "PATCH", payload);
  if (!response.status) {
    return thunkAPI.rejectWithValue({
      message: response.message,
    });
  }
  return payload as Movie;
});

export const deleteMovie = createAsyncThunk<
  {id: string},
  string,
  { rejectValue: returnError }
>("movie/delete", async (payload, thunkAPI) => {
  const response = await axiosCall(`/movie/${payload}`, "DELETE");
  if (!response.status) {
    return thunkAPI.rejectWithValue({
      message: response.message,
    });
  }
  return {id: payload};
});

export const getMovies = createAsyncThunk<
  Movie[],
  undefined,
  { rejectValue: returnError }
>("movies/fetch", async (state, thunkAPI) => {
  const response = await axiosCall("/movies", "GET");
  if (!response.status) {
    return thunkAPI.rejectWithValue({
      message: response.message,
    });
  }

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
      message: response.message,
    });
  }
  return response.data as Movie;
});

export const searchMovies = createAsyncThunk<
  Movie[],
  string,
  { rejectValue: string }
>("actor/details", async (payload, thunkAPI) => {
  const response = await axiosCall(`/movies/${payload}`, "GET");
  if (!response.status) {
    return thunkAPI.rejectWithValue(response.message);
  }
  return response.data as Movie[];
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
      state.movies.push(payload);
      state.status = "idle";
    });

    builder.addCase(createMovie.rejected, (state, { payload }) => {
      if (payload) state.error = payload.message;
      state.status = "idle";
    });

    builder.addCase(editMovie.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(editMovie.fulfilled, (state, { payload }) => {
      state.movies = state.movies.map((movies) =>
        movies.id === payload.id ? { ...movies, ...payload } : movies
      );

      state.status = "idle";
    });

    builder.addCase(editMovie.rejected, (state, { payload }) => {
      if (payload) state.error = payload.message;
      state.status = "idle";
    });

    builder.addCase(deleteMovie.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(deleteMovie.fulfilled, (state, { payload }) => {
      state.movies = state.movies.filter(({ id }) => id !== payload.id)
      state.status = "idle";
    });

    builder.addCase(deleteMovie.rejected, (state, { payload }) => {
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
