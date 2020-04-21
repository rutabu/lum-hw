import React, { FC, useState } from 'react';
import { Button, Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Book } from '../books/interfaces';
import Counter from './Counter';

interface BookDetailsProps {
  book: Book,
  handleAddToCart?: (count: number, book: Book) => void,
}

const BookDetails: FC<BookDetailsProps> = ({
  book,
  handleAddToCart,
}: BookDetailsProps): JSX.Element => {
  const [count, setCount] = useState(1);
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
            {handleAddToCart && (
              <Box textAlign="center" maxWidth={150}>
                <Box mt={2} mb={1}>
                  <Counter
                    max={quantity}
                    onDecrease={() => setCount(count - 1)}
                    onIncrease={() => setCount(count + 1)}
                  />
                </Box>
                <Button onClick={() => handleAddToCart(count, book)} color="primary" variant="contained">
                  Add to cart
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default BookDetails;
