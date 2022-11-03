import { configureStore } from '@reduxjs/toolkit';
import movieSlice from '../features/movieSlice';
import userSlice from '../features/userSlice';

export const store = configureStore({
  reducer: {
    currentUser: userSlice,
    movieList: movieSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch