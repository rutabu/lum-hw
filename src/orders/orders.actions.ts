import { Dispatch } from 'redux';
import {
  getOrders,
  getUpdatedOrders,
  getUpdatedStatusOrders,
  storeOrders,
} from '../utils/database';
import { LOAD_ORDERS, SET_ORDERS_LOADING } from './orders.actionsTypes';
import { Book } from '../books/interfaces';
import { ORDER_STATUS_TYPE } from './interfaces';


export const loadOrders = (userId?: number) => async (dispatch: Dispatch) => {
  const response = await getOrders();
  const orders = userId
    ? response?.filter((order) => order.userId === userId)
    : response?.filter(
      (order) => (
        order.status === ORDER_STATUS_TYPE.NEW || order.status === ORDER_STATUS_TYPE.PAID)
      );

  dispatch({
    type: LOAD_ORDERS,
    orders,
  });
};

export const updateOrder = (
  count: number,
  book: Book,
  userId: number,
) => async (dispatch: Dispatch) => {
  const response = await getUpdatedOrders(count, book, userId);
  // store updated orders list to 'database'
  storeOrders(response);
  const orders = response?.filter((order) => order.userId === userId);

  dispatch({
    type: LOAD_ORDERS,
    orders,
  });
};

export const updateOrderStatus = (
  orderId: number,
  status: ORDER_STATUS_TYPE,
  userId?: number,
) => async (dispatch: Dispatch) => {
  const response = await getUpdatedStatusOrders(orderId, status);
  // store updated orders list to 'database'
  storeOrders(response);

  const orders = userId
    ? response?.filter((order) => order.userId === userId)
    : response?.filter(
      (order) => (
        order.status === ORDER_STATUS_TYPE.NEW || order.status === ORDER_STATUS_TYPE.PAID)
    );

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
