import { Book } from './interfaces';

export const LOAD_BOOKS = 'LOAD_BOOKS';
export const SET_BOOKS_LOADING = 'LOAD_BOOK_INFO';

export interface LoadBooksAction {
  type: typeof LOAD_BOOKS;
  books: Book[];
}

export interface SetBooksLoadingAction {
  type: typeof SET_BOOKS_LOADING;
  isLoading: boolean;
}

export type BooksActionTypes = LoadBooksAction | SetBooksLoadingAction;
