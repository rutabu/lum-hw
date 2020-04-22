import React, { FC } from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Backdrop,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import { Book } from '../books/interfaces';
import { Order, ORDER_STATUS_TYPE } from '../orders/interfaces';
import Counter from './Counter';

interface OrderDetailsProps {
  order: Order,
  isLoading: boolean,
  handleUpdateBookOrderCount?: (count: number, book: Book) => void,
  handleOrderStatusChange?: (orderId: number, status: ORDER_STATUS_TYPE) => void,
}

const OrderDetails: FC<OrderDetailsProps> = ({
  order,
  isLoading,
  handleUpdateBookOrderCount,
  handleOrderStatusChange,
}: OrderDetailsProps): JSX.Element => {
  const {
    id: orderId,
    books,
  } = order;

  if (books.length === 0 && !isLoading) {
    return <Alert variant="filled" severity="info">Basket is empty</Alert>;
  }

  return (
    <>
      {isLoading && (
        <Backdrop open style={{ zIndex: 1 }}>
          <CircularProgress color="primary" />
        </Backdrop>
      )}
      <TableContainer component={Paper}>
        <Table aria-label="order details table">
          <TableHead>
            <TableRow>
              <TableCell><strong>Cover</strong></TableCell>
              <TableCell align="center"><strong>Title</strong></TableCell>
              <TableCell align="center"><strong>Author</strong></TableCell>
              <TableCell align="center"><strong>Year of publication</strong></TableCell>
              {handleUpdateBookOrderCount && (
                <>
                  <TableCell align="center"><strong>Count</strong></TableCell>
                  <TableCell align="center"><strong>Actions</strong></TableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map(({
              id: bookId,
              bookCover,
              title,
              author,
              publishedDate,
              quantity,
              countOrdered,
            }, index) => (
              <TableRow key={`${orderId}_${bookId}`}>
                <TableCell component="th" scope="row" size="small">
                  <Link to={`/book/${bookId}`}>
                    <img src={bookCover} title={title} alt={title} width="200" />
                  </Link>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2" color="textSecondary" component="p">
                    {title}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2" color="textSecondary" component="p">
                    {author}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2" color="textSecondary" component="p">
                    {publishedDate}
                  </Typography>
                </TableCell>
                {handleUpdateBookOrderCount && (
                  <>
                    <TableCell align="center">
                      <Counter
                        max={quantity}
                        startCount={countOrdered}
                        onDecrease={
                          () => handleUpdateBookOrderCount(countOrdered - 1, books[index])
                        }
                        onIncrease={
                          () => handleUpdateBookOrderCount(countOrdered + 1, books[index])
                        }
                      />
                    </TableCell>
                    <TableCell align="center" size="small">
                      <Button
                        onClick={() => handleUpdateBookOrderCount(0, books[index])}
                        color="secondary"
                        variant="outlined"
                        endIcon={<DeleteIcon />}
                        fullWidth
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {handleOrderStatusChange && (
        <Button
          onClick={() => handleOrderStatusChange(orderId, ORDER_STATUS_TYPE.PAID)}
          color="secondary"
          variant="contained"
          fullWidth
        >
          Pay
        </Button>
      )}
    </>
  );
};

export default OrderDetails;
