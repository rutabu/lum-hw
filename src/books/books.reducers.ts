import {
  BooksActionTypes,
  LOAD_BOOKS,
  SET_BOOKS_LOADING,
} from './books.actionsTypes';
import { BooksState } from '../redux/state';

export default function booksReducer(
  state = {
    isLoading: false,
    list: undefined,
  },
  action: BooksActionTypes,
): BooksState {
  switch (action.type) {
    case LOAD_BOOKS: {
      return {
        ...state,
        isLoading: false,
        list: [...action.books],
      };
    }
    case SET_BOOKS_LOADING: {
      return {
        ...state,
        isLoading: action.isLoading,
      };
    }
    default:
      return state;
  }
}
