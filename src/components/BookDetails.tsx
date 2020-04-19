import React, { FC } from 'react';
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Book } from '../books/interfaces';

interface BookDetailsProps {
  book: Book;
}

const BookDetails: FC<BookDetailsProps> = ({ book }: BookDetailsProps): JSX.Element => {
  const {
    bookCover,
    title,
    author,
    publishedDate,
    quantity,
  } = book;

  return (
    <Paper>
      <Box p={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={5}>
            <img src={bookCover} title={title} alt={title} width="100%" />
          </Grid>
          <Grid item xs={12} sm={6} md={7}>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              <strong>Author: </strong>
              {author}
              <br />
              <strong>Year of publication: </strong>
              {publishedDate}
              <br />
              <strong>Availibility: </strong>
              {quantity}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default BookDetails;
