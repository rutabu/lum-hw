import { Dispatch } from 'redux';
import { LOAD_BOOKS, SET_BOOKS_LOADING } from './books.actionsTypes';
import { getBooks } from '../utils/database';

export const loadBooks = () => async (dispatch: Dispatch) => {
  const books = await getBooks();

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
