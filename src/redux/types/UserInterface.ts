import { User } from "./ActionTypes";

// Users
export const CREATE_USER = "CREATE_USER";
export const AUTH_USER = "AUTH_USER";
export const SET_AUTH_USER = "SET_AUTH_USER";
export const EDIT_USER = "EDIT_USER";
export const SET_USERS = "SET_USERS";
export const REMOVE_USER = "REMOVE_USER";

export interface SetUserAction {
  type: typeof SET_USERS;
  users: User[];
}

export interface CreateUserAction {
  type: typeof CREATE_USER;
  user: User;
}

export interface AuthUserAction {
  type: typeof AUTH_USER;
  user: {};
}

export interface SetAuthUserAction {
  type: typeof SET_AUTH_USER;
  user: {};
}

export interface EditUserAction {
  type: typeof EDIT_USER;
  user: User;
}

export interface RemoveUserAction {
  type: typeof REMOVE_USER;
  id: string;
}

export type UserActionTypes =
  | SetUserAction
  | SetAuthUserAction
  | CreateUserAction
  | AuthUserAction
  | EditUserAction
  | RemoveUserAction;

export const LOGOUT_USER = "LOGOUT_USER";

export interface LogoutUserAction {
  type: typeof LOGOUT_USER;
}

export type LogoutUserType = LogoutUserAction;