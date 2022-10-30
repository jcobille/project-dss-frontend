import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { movieReducer } from "../redux/reducers/movies";
import { userAuthReducer } from "../redux/reducers/users";
import { AppActions } from "../redux/types";

export const rootReducer = combineReducers({
  currentUser: userAuthReducer,
  movieList : movieReducer,
});

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(
  rootReducer,
  composeEnhancer(
    applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>)
  )
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
