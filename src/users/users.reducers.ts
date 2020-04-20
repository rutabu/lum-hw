import {
  UsersActionTypes,
  LOAD_USERS,
  SET_USERS_LOADING,
  SET_LOGIN_FAILED,
  SET_AUTH_USER,
} from './users.actionsTypes';
import { UsersState } from '../redux/state';

export default function UsersReducer(
  state = {
    isLoading: false,
    loginFailed: false,
    list: undefined,
  },
  action: UsersActionTypes,
): UsersState {
  switch (action.type) {
    case LOAD_USERS: {
      return {
        ...state,
        isLoading: false,
        list: [...action.users],
      };
    }
    case SET_USERS_LOADING: {
      return {
        ...state,
        isLoading: action.isLoading,
      };
    }
    case SET_AUTH_USER: {
      return {
        ...state,
        isLoading: false,
        loginFailed: false,
        authUser: action.authUser,
      };
    }
    case SET_LOGIN_FAILED: {
      return {
        ...state,
        isLoading: false,
        loginFailed: action.loginFailed,
      };
    }
    default:
      return state;
  }
}
