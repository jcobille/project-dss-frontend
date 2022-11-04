import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Actor } from "../../redux/types/ActionTypes";
import { axiosCall } from "../utils/api";
import { setCookie } from "../utils/cookie";

interface ActorState {
  actors: {};
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ActorState = {
  actors: {},
  status: "idle",
  error: null,
};

export const getActors = createAsyncThunk<
  Actor,
  undefined,
  { rejectValue: string }
>("actor/fetch", async (payload, thunkAPI) => {
  const response = await axiosCall(`/actor`, "GET");
  if (!response.status) {
    return thunkAPI.rejectWithValue(response.message);
  }
  return response.data as Actor;
});

export const searchActors = createAsyncThunk<
  Actor,
  string,
  { rejectValue: string }
>("actor/details", async (payload, thunkAPI) => {
  const response = await axiosCall(`/actor/${payload}`, "GET");
  if (!response.status) {
    return thunkAPI.rejectWithValue(response.message);
  }
  return response.data as Actor;
});

export const actorSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    clearErrorMessage(state) {
      state.error = "";
    },
    clearActorsList(state) {
      state.actors = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getActors.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(getActors.fulfilled, (state, { payload }) => {
      state.actors = payload;
      state.status = "idle";
    });

    builder.addCase(getActors.rejected, (state, { payload }) => {
      if (payload) state.error = payload;
      state.status = "idle";
    });

    builder.addCase(searchActors.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(searchActors.fulfilled, (state, { payload }) => {
      state.actors = payload;
      state.status = "idle";
    });

    builder.addCase(searchActors.rejected, (state, { payload }) => {
      if (payload) state.error = payload;
      state.status = "idle";
    });
  },
});
export const { clearActorsList } = actorSlice.actions;
export default actorSlice.reducer;
