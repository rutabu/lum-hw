import { Order } from './interfaces';

export const LOAD_ORDERS = 'LOAD_ORDERS';
export const SET_ORDERS_LOADING = 'SET_ORDERS_LOADING';
export const RESET_ORDERS_STATE = 'RESET_ORDERS_STATE';

export interface LoadOrdersAction {
  type: typeof LOAD_ORDERS;
  orders: Order[];
}

export interface SetOrdersLoadingAction {
  type: typeof SET_ORDERS_LOADING;
  isLoading: boolean;
}

export interface ResetOrdersStateAction {
  type: typeof RESET_ORDERS_STATE;
}

export type OrdersActionTypes = LoadOrdersAction | SetOrdersLoadingAction | ResetOrdersStateAction;
