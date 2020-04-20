import { Dispatch } from 'redux';
import {
  getOrders,
  getUpdatedOrders,
  storeOrders,
} from '../utils/database';
import { LOAD_ORDERS, SET_ORDERS_LOADING } from './orders.actionsTypes';


export const loadOrders = (userId?: number) => async (dispatch: Dispatch) => {
  const response = await getOrders();
  const orders = userId
    ? response?.filter((order) => order.userId === userId)
    : response;

  dispatch({
    type: LOAD_ORDERS,
    orders,
  });
};

export const updateOrder = (
  count: number,
  bookId: number,
  userId: number,
) => async (dispatch: Dispatch) => {
  const orders = await getUpdatedOrders(count, bookId, userId);
  // store updated orders list to 'database'
  storeOrders(orders);

  dispatch({
    type: LOAD_ORDERS,
    orders,
  });
};

export const setOrdersLoading = (isLoading: boolean) => async (dispatch: Dispatch) => {
  dispatch({
    type: SET_ORDERS_LOADING,
    isLoading,
  });
};
