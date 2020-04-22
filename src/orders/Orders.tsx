import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import {
  Backdrop,
  CircularProgress,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { RouteComponentProps } from 'react-router-dom';
import {
  loadOrders,
  setOrdersLoading,
  updateOrder,
  updateOrderStatus,
} from './orders.actions';
import { AppState, OrdersState } from '../redux/state';
import { AuthUser } from '../users/interfaces';
import { getUserId, isUserAdmin, isUserClient } from '../users/functions';
import { ORDER_STATUS_TYPE } from './interfaces';
import OrderDetails from '../components/OrderDetails';
import { Book } from '../books/interfaces';
import { getNewOrder, getOrderById } from './functions';
import OrdersList from '../components/OrdersList';

interface OrderUrlParams {
  orderId?: string,
}

export interface OrdersWrapperProps extends RouteComponentProps<OrderUrlParams> {
  orders: OrdersState,
  dispatch: ThunkDispatch<AppState, void, AnyAction>,
  authUser?: AuthUser,
}

class Orders extends Component<OrdersWrapperProps> {
  constructor(props: OrdersWrapperProps) {
    super(props);

    this.handleOrderStatusChange = this.handleOrderStatusChange.bind(this);
    this.handleUpdateBookOrderCount = this.handleUpdateBookOrderCount.bind(this);
  }

  componentDidMount() {
    const { dispatch, authUser, orders } = this.props;

    if (!orders.list) {
      const userId = isUserClient(authUser) ? getUserId(authUser) : undefined;
      dispatch(setOrdersLoading(true));
      dispatch(loadOrders(userId));
    }
  }

  handleOrderStatusChange(orderId: number, status: ORDER_STATUS_TYPE) {
    const { dispatch, authUser } = this.props;
    const userId = getUserId(authUser);
    dispatch(setOrdersLoading(true));
    dispatch(updateOrderStatus(orderId, status, userId));
  }

  handleUpdateBookOrderCount(count: number, book: Book) {
    const { authUser, dispatch } = this.props;
    const userId = getUserId(authUser);

    if (typeof userId !== 'undefined') {
      dispatch(setOrdersLoading(true));
      dispatch(updateOrder(count, book, userId));
    }
  }

  render() {
    const {
      orders: {
        list: ordersList,
        isLoading,
      },
      authUser,
      match: { params: { orderId } },
    } = this.props;

    if (!authUser) {
      return <Alert variant="filled" severity="error">You must login to view your orders</Alert>;
    }

    if (ordersList?.length === 0 && !isLoading) {
      return <Alert variant="filled" severity="info">There are no orders</Alert>;
    }

    const isClient = isUserClient(authUser);
    const isAdmin = isUserAdmin(authUser);

    if (ordersList && ordersList.length > 0 && orderId) {
      const order = orderId === ORDER_STATUS_TYPE.NEW
        ? getNewOrder(ordersList)
        : getOrderById(ordersList, orderId);

      if (!order) {
        return <Alert variant="filled" severity="info">Basket is empty</Alert>;
      }

      const areActionsAllowed = isClient && order.status === ORDER_STATUS_TYPE.NEW;

      return (
        <OrderDetails
          order={order}
          isLoading={isLoading}
          handleUpdateBookOrderCount={
            areActionsAllowed ? this.handleUpdateBookOrderCount : undefined
          }
          handleOrderStatusChange={
            areActionsAllowed ? this.handleOrderStatusChange : undefined
          }
        />
      );
    }

    return (
      <>
        {isLoading && (
          <Backdrop open style={{ zIndex: 1 }}>
            <CircularProgress color="primary" />
          </Backdrop>
        )}
        {ordersList && ordersList.length > 0 && (
          <OrdersList
            orders={ordersList}
            isAdmin={isAdmin}
            isClient={isClient}
            handleOrderStatusChange={this.handleOrderStatusChange}
          />
        )}
      </>
    );
  }
}

// @TODO add return type
const mapStateToProps = (state: AppState) => ({
  orders: state.orders,
  authUser: state.users.authUser,
});

// @TODO add return type
const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, void, AnyAction>) => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Orders);
