import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { Backdrop, CircularProgress } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { RouteComponentProps } from 'react-router-dom';
import { loadOrders, setOrdersLoading } from './orders.actions';
import { AppState, OrdersState } from '../redux/state';
import { AuthUser } from '../users/interfaces';
import { getUserId, isUserClient } from '../users/functions';

interface OrderUrlParams {
  orderType?: string,
}

export interface OrdersWrapperProps extends RouteComponentProps<OrderUrlParams> {
  orders: OrdersState,
  dispatch: ThunkDispatch<AppState, void, AnyAction>,
  authUser?: AuthUser,
}

class Orders extends Component<OrdersWrapperProps> {
  componentDidMount() {
    const { dispatch, authUser } = this.props;
    const userId = isUserClient(authUser) ? getUserId(authUser) : undefined;
    dispatch(setOrdersLoading(true));
    dispatch(loadOrders(userId));
  }

  render() {
    const {
      orders: {
        list: ordersList,
        isLoading,
      },
      authUser,
    } = this.props;

    if (!authUser) {
      return <Alert variant="filled" severity="error">You must login to view your orders</Alert>;
    }

    if (isLoading) {
      return (
        <Backdrop open addEndListener={() => null}>
          <CircularProgress color="primary" />
        </Backdrop>
      );
    }

    if (!ordersList) {
      return <Alert variant="filled" severity="info">There are no orders</Alert>;
    }

    return (
      <ul>
        {ordersList.map(({
          id,
          userId,
          status,
          books,
        }) => (
          <li key={id}>
            Id: {id}
            <br />
            User id: {userId}
            <br />
            Ordered books count: {books.reduce((total, book) => total + book.count, 0)}
            <br />
            Status: <strong>{status}</strong>
          </li>
        ))}
      </ul>
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
