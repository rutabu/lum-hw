import {
  OrdersActionTypes,
  LOAD_ORDERS,
  SET_ORDERS_LOADING,
} from './orders.actionsTypes';
import { OrdersState } from '../redux/state';

export default function OrdersReducer(
  state = {
    isLoading: false,
    list: undefined,
  },
  action: OrdersActionTypes,
): OrdersState {
  switch (action.type) {
    case LOAD_ORDERS: {
      return {
        ...state,
        isLoading: false,
        list: [...action.orders],
      };
    }
    case SET_ORDERS_LOADING: {
      return {
        ...state,
        isLoading: action.isLoading,
      };
    }
    default:
      return state;
  }
}
