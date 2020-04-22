import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Book } from '../books/interfaces';

interface BooksListProps {
  books: Book[];
  handleDeleteBook?: (bookId: number) => void
}

const BooksList: FC<BooksListProps> = ({
  books,
  handleDeleteBook,
}: BooksListProps): JSX.Element => (
  <Grid container spacing={3}>
    {books.map(({ id, bookCover, title }) => (
      <Grid item xs={12} md={6} lg={4} key={id}>
        <Paper>
          <Link to={`/book/${id}`}>
            <Box p={2} maxHeight={550} minHeight={350} overflow="hidden" display="flex">
              <img src={bookCover} title={title} alt={title} width="100%" />
            </Box>
          </Link>
          {handleDeleteBook && (
            <Box mt={-1} ml={2} mr={2} pb={2}>
              <Button
                onClick={
                  () => handleDeleteBook(id)
                }
                color="secondary"
                variant="outlined"
                endIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </Box>
          )}
        </Paper>
      </Grid>
    ))}
  </Grid>
);

export default BooksList;
