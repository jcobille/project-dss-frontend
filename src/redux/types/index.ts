import { MovieActionTypes } from "./MovieInterface";
import { LogoutUserAction, UserActionTypes } from "./UserInterface";

export type AppActions = MovieActionTypes | UserActionTypes | LogoutUserAction;
