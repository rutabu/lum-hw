import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import CheckIcon from '@material-ui/icons/Check';
import BlockIcon from '@material-ui/icons/Block';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { RouteComponentProps, withRouter } from 'react-router-dom';
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
import OrderDetails from './OrderDetails';
import { Book } from '../books/interfaces';

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
    const { dispatch, authUser } = this.props;
    const userId = isUserClient(authUser) ? getUserId(authUser) : undefined;
    dispatch(setOrdersLoading(true));
    dispatch(loadOrders(userId));
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
      history,
      match: { params: { orderId } },
    } = this.props;

    if (!authUser) {
      return <Alert variant="filled" severity="error">You must login to view your orders</Alert>;
    }

    if (!ordersList && !isLoading) {
      return <Alert variant="filled" severity="info">There are no orders</Alert>;
    }

    const isClient = isUserClient(authUser);
    const isAdmin = isUserAdmin(authUser);

    if (ordersList && orderId) {
      const order = orderId === ORDER_STATUS_TYPE.NEW
        ? ordersList.find((item) => item.status === ORDER_STATUS_TYPE.NEW)
        : ordersList.find((item) => item.id === parseInt(orderId, 10));

      if (!order) {
        return <Alert variant="filled" severity="info">Basker is empty</Alert>;
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
        {ordersList && (
          <TableContainer component={Paper}>
            <Table aria-label="orders table">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Id</strong></TableCell>
                  <TableCell align="center"><strong>User id</strong></TableCell>
                  <TableCell align="center"><strong>Books count</strong></TableCell>
                  <TableCell align="center"><strong>Status</strong></TableCell>
                  <TableCell align="center"><strong>Actions</strong></TableCell>
                  <TableCell align="center"><strong>View details</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ordersList.map(({
                  id,
                  userId,
                  status,
                  books,
                }) => (
                  <TableRow key={id}>
                    <TableCell component="th" scope="row">
                      {id}
                    </TableCell>
                    <TableCell align="center">{userId}</TableCell>
                    <TableCell align="center">{books.reduce((total, book) => total + book.countOrdered, 0)}</TableCell>
                    <TableCell align="center">{status}</TableCell>
                    <TableCell align="center" size="small">
                      {isAdmin && (
                        <Box mb={1}>
                          <Button
                            onClick={() => this.handleOrderStatusChange(id, ORDER_STATUS_TYPE.SENT)}
                            color="primary"
                            variant="outlined"
                            endIcon={<ExitToAppIcon />}
                            fullWidth
                          >
                            Send
                          </Button>
                        </Box>
                      )}
                      {isClient && status === ORDER_STATUS_TYPE.NEW && (
                        <Box mb={1}>
                          <Button
                            onClick={() => this.handleOrderStatusChange(id, ORDER_STATUS_TYPE.PAID)}
                            color="primary"
                            variant="outlined"
                            endIcon={<CheckIcon />}
                            fullWidth
                          >
                            Confirm
                          </Button>
                        </Box>
                      )}
                      {(isAdmin || (isClient && status === ORDER_STATUS_TYPE.NEW)) && (
                        <Button
                          onClick={
                            () => this.handleOrderStatusChange(id, ORDER_STATUS_TYPE.CANCELED)
                          }
                          color="secondary"
                          variant="outlined"
                          endIcon={<BlockIcon />}
                          fullWidth
                        >
                          Cancel
                        </Button>
                      )}
                    </TableCell>
                    <TableCell align="center" size="small">
                      <Button color="primary" onClick={() => history.push(`/order/${id}`)}>
                        <ArrowForwardIosIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
)(withRouter(Orders));
