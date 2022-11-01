import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../redux/types/ActionTypes";
import { axiosCall } from "../utils/api";

type returnError = {
  message: string;
};

interface UserState {
  details: {};
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  details: {},
  status: "idle",
  error: null,
};

export const createUser = createAsyncThunk<
  User,
  { name: string; email: string; password: string },
  { rejectValue: returnError }
>("user/create", async (payload, thunkAPI) => {
  const response = await axiosCall("/signup", "POST", payload);
  return response.data as User;
});

export const loginUser = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: returnError }
>("user/login", async (payload, thunkAPI) => {
  const response = await axiosCall("/signin", "POST", payload);
  return response.data as User;
});

export const userSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    createUser(state: UserState) {},
    authUser(state: UserState) {},
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.status = "idle";
    });

    builder.addCase(loginUser.rejected, (state, { payload }) => {
      console.log("rejected", payload);
      if (payload) state.error = payload.message;
      state.status = "idle";
    });

    builder.addCase(createUser.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(createUser.fulfilled, (state, { payload }) => {
      state.status = "idle";
    });

    builder.addCase(createUser.rejected, (state, { payload }) => {
      if (payload) state.error = payload.message;
      state.status = "idle";
    });
  },
});

export default userSlice.reducer;
