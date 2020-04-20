import { Dispatch } from 'redux';
import { LOAD_BOOKS, SET_BOOKS_LOADING } from './books.actionsTypes';
import { getBooks } from '../utils/database';

export const loadBooks = (onlyAvailable: boolean = true) => async (dispatch: Dispatch) => {
  const response = await getBooks();
  const books = onlyAvailable
    ? response?.filter((book) => book.quantity > 0)
    : response;

  dispatch({
    type: LOAD_BOOKS,
    books,
  });
};

export const setBooksLoading = (isLoading: boolean) => async (dispatch: Dispatch) => {
  dispatch({
    type: SET_BOOKS_LOADING,
    isLoading,
  });
};
