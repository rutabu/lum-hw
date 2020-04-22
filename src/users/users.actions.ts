import { Dispatch } from 'redux';
import {
  LOAD_USERS,
  SET_USERS_LOADING,
  SET_AUTH_USER,
  SET_LOGIN_FAILED,
} from './users.actionsTypes';
import {
  getLoggedInAuthUser,
  removeStoredAuthUser,
  storeAuthUser,
  storeUsers,
} from '../utils/database';
import { AuthUser } from './interfaces';
import { getAuthUser, getUsers, getUsersWithRemovedUser } from '../utils/api';

export const loadUsers = () => async (dispatch: Dispatch) => {
  const users = await getUsers();

  dispatch({
    type: LOAD_USERS,
    users,
  });
};

export const setUsersLoading = (isLoading: boolean) => async (dispatch: Dispatch) => {
  dispatch({
    type: SET_USERS_LOADING,
    isLoading,
  });
};

export const setLoginFailed = (loginFailed: boolean) => ({
  type: SET_LOGIN_FAILED,
  loginFailed,
});

export const setAuthUser = (authUser: AuthUser | undefined) => ({
  type: SET_AUTH_USER,
  authUser,
});

export const userLogin = (username: string, password: string) => async (dispatch: Dispatch) => {
  const authUser = await getAuthUser(username, password);

  if (authUser) {
    storeAuthUser(authUser);
    dispatch(setAuthUser(authUser));
  } else {
    dispatch(setLoginFailed(true));
  }
};

export const loadStoredAuthUser = () => async (dispatch: Dispatch) => {
  const authUser = getLoggedInAuthUser();

  if (authUser) {
    dispatch(setAuthUser(authUser));
  }
};

export const userLogout = () => async (dispatch: Dispatch) => {
  removeStoredAuthUser();

  dispatch(setAuthUser(undefined));
};

export const deleteUser = (userId: number) => async (dispatch: Dispatch) => {
  const users = await getUsersWithRemovedUser(userId);
  storeUsers(users);

  dispatch({
    type: LOAD_USERS,
    users,
  });
};
