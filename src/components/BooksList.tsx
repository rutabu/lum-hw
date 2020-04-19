import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { Book } from '../books/interfaces';

interface BooksListProps {
  books: Book[];
}

const BooksList: FC<BooksListProps> = ({ books }: BooksListProps): JSX.Element => (
  <Grid container spacing={3}>
    {books.map(({ id, bookCover, title }) => (
      <Grid item xs={12} md={6} lg={4} key={id}>
        <Link to={`/book/${id}`}>
          <Paper>
            <Box p={2} maxHeight={550} minHeight={350} overflow="hidden" display="flex">
              <img src={bookCover} title={title} alt={title} width="100%" />
            </Box>
          </Paper>
        </Link>
      </Grid>
    ))}
  </Grid>
);

export default BooksList;
