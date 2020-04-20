import { AuthUser, User } from './interfaces';

export const LOAD_USERS = 'LOAD_USERS';
export const SET_USERS_LOADING = 'LOAD_USER_INFO';
export const SET_LOGIN_FAILED = 'SET_LOGIN_FAILED';
export const SET_AUTH_USER = 'SET_AUTH_USER';

export interface LoadUsersAction {
  type: typeof LOAD_USERS;
  users: User[];
}

export interface SetUsersLoadingAction {
  type: typeof SET_USERS_LOADING;
  isLoading: boolean;
}

export interface SetLoginFailedAction {
  type: typeof SET_LOGIN_FAILED;
  loginFailed: boolean;
}

export interface SetAuthUserAction {
  type: typeof SET_AUTH_USER;
  authUser: AuthUser;
}

export type UsersActionTypes =
  LoadUsersAction |
  SetUsersLoadingAction |
  SetLoginFailedAction |
  SetAuthUserAction;
