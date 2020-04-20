import { Book } from '../books/interfaces';
import { AuthUser, User } from '../users/interfaces';
import { Order } from '../orders/interfaces';

export interface BooksState {
  isLoading: boolean,
  list?: Book[],
}

export interface UsersState {
  isLoading: boolean,
  loginFailed: boolean,
  list?: User[],
  authUser?: AuthUser,
}

export interface OrdersState {
  isLoading: boolean,
  list?: Order[],
}

export interface AppState {
  books: BooksState,
  users: UsersState,
  orders: OrdersState,
}
