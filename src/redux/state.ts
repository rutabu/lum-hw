import { Book } from '../books/interfaces';

export interface BooksState {
  isLoading: boolean,
  list?: Book[]
}

export interface AppState {
  books: BooksState
}
