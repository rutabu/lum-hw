import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { Backdrop, CircularProgress } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { RouteComponentProps } from 'react-router-dom';
import { loadBooks, setBooksLoading } from './books.actions';
import BooksList from '../components/BooksList';
import BookDetails from '../components/BookDetails';
import { AppState, BooksState } from '../redux/state';
import { AuthUser } from '../users/interfaces';
import { getUserId, isUserClient } from '../users/functions';
import { updateOrder } from '../orders/orders.actions';

interface BookUrlParams {
  bookId?: string,
}

export interface BooksWrapperProps extends RouteComponentProps<BookUrlParams> {
  books: BooksState,
  dispatch: ThunkDispatch<AppState, void, AnyAction>,
  authUser?: AuthUser,
}

class Books extends Component<BooksWrapperProps> {
  constructor(props: BooksWrapperProps) {
    super(props);
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  componentDidMount() {
    const { dispatch, books: { list: booksList } } = this.props;
    if (!booksList) {
      dispatch(setBooksLoading(true));
      dispatch(loadBooks());
    }
  }

  handleAddToCart(count: number, bookId: number) {
    const { authUser, dispatch } = this.props;
    const userId = getUserId(authUser);

    if (userId) {
      dispatch(updateOrder(count, bookId, userId));
    }
  }

  render() {
    const {
      books: {
        list: booksList,
        isLoading,
      },
      match: { params: { bookId } },
      authUser,
    } = this.props;
    const isClient = isUserClient(authUser);

    if (isLoading) {
      return (
        <Backdrop open addEndListener={() => null}>
          <CircularProgress color="primary" />
        </Backdrop>
      );
    }

    if (!booksList) {
      return <Alert variant="filled" severity="error">Sorry all books were sold out</Alert>;
    }

    if (bookId) {
      const book = booksList.find((item) => item.id === parseInt(bookId, 10));

      if (!book) {
        return <div>Sorry book you are looking for is no longer available</div>;
      }

      return (
        <BookDetails book={book} handleAddToCart={isClient ? this.handleAddToCart : undefined} />
      );
    }

    return <BooksList books={booksList} />;
  }
}
// @TODO add return type
const mapStateToProps = (state: AppState) => ({
  books: state.books,
  authUser: state.users.authUser,
});
// @TODO add return type
const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, void, AnyAction>) => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Books);
