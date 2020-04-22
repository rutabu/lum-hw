import React, { FC } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CheckIcon from '@material-ui/icons/Check';
import BlockIcon from '@material-ui/icons/Block';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Order, ORDER_STATUS_TYPE } from '../orders/interfaces';

interface OrdersListProps extends RouteComponentProps {
  orders: Order[];
  isAdmin: boolean;
  isClient: boolean
  handleOrderStatusChange: (id: number, status: ORDER_STATUS_TYPE) => void
}

const OrdersList: FC<OrdersListProps> = ({
  orders,
  isAdmin,
  isClient,
  handleOrderStatusChange,
  history,
}: OrdersListProps): JSX.Element => (
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
        {orders.map(({
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
                    onClick={() => handleOrderStatusChange(id, ORDER_STATUS_TYPE.SENT)}
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
                    onClick={() => handleOrderStatusChange(id, ORDER_STATUS_TYPE.PAID)}
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
                    () => handleOrderStatusChange(id, ORDER_STATUS_TYPE.CANCELED)
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
);

export default withRouter(OrdersList);
