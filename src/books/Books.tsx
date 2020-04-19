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

interface BookUrlParams {
  bookId: string | undefined,
}

export interface BooksWrapperProps extends RouteComponentProps<BookUrlParams> {
  books: BooksState,
  dispatch: ThunkDispatch<AppState, void, AnyAction>,
}

class Books extends Component<BooksWrapperProps> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(setBooksLoading(true));
    dispatch(loadBooks());
  }

  render() {
    const {
      books: {
        list: booksList,
        isLoading,
      },
      match: { params: { bookId } },
    } = this.props;

    if (isLoading) {
      return (
        <Backdrop open>
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

      return <BookDetails book={book} />;
    }

    return <BooksList books={booksList} />;
  }
}

const mapStateToProps = (state: AppState) => ({
  books: state.books,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, void, AnyAction>): any => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Books);
