import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { Backdrop, CircularProgress } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { RouteComponentProps } from 'react-router-dom';
import { deleteBook, loadBooks, setBooksLoading } from './books.actions';
import BooksList from '../components/BooksList';
import BookDetails from '../components/BookDetails';
import { AppState, BooksState } from '../redux/state';
import { AuthUser } from '../users/interfaces';
import { getUserId, isUserAdmin, isUserClient } from '../users/functions';
import { updateOrder } from '../orders/orders.actions';
import { Book } from './interfaces';

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
    this.handleDeleteBook = this.handleDeleteBook.bind(this);
  }

  componentDidMount() {
    const { dispatch, books } = this.props;
    if (!books.list) {
      dispatch(setBooksLoading(true));
      dispatch(loadBooks());
    }
  }

  handleAddToCart(count: number, book: Book) {
    const { authUser, dispatch } = this.props;
    const userId = getUserId(authUser);

    if (typeof userId !== 'undefined') {
      dispatch(updateOrder(count, book, userId));
    }
  }

  handleDeleteBook(bookId: number) {
    const { dispatch } = this.props;
    dispatch(setBooksLoading(true));
    dispatch(deleteBook(bookId));
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
    const isAdmin = isUserAdmin(authUser);

    if (!booksList && !isLoading) {
      return <Alert variant="filled" severity="error">Failed to fetch books</Alert>;
    }

    if (booksList?.length === 0 && !isLoading) {
      return <Alert variant="filled" severity="info">All books were sold out</Alert>;
    }

    if (booksList && booksList.length > 0 && bookId) {
      const book = booksList.find((item) => item.id === parseInt(bookId, 10));

      if (!book) {
        return <Alert variant="filled" severity="info">Sorry book you are looking for is no longer available</Alert>;
      }

      return (
        <BookDetails
          book={book}
          isLoading={isLoading}
          handleAddToCart={isClient ? this.handleAddToCart : undefined}
          handleDeleteBook={isAdmin ? this.handleDeleteBook : undefined}
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
        {booksList && booksList.length > 0 && (
          <BooksList
            books={booksList}
            handleDeleteBook={isAdmin ? this.handleDeleteBook : undefined}
          />
        )}
      </>
    );
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
