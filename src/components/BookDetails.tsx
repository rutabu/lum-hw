import React, { FC, useState } from 'react';
import { Button, Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { AddBox, IndeterminateCheckBox } from '@material-ui/icons';
import { Book } from '../books/interfaces';

interface BookDetailsProps {
  book: Book,
  handleAddToCart?: (count: number, bookId: number) => void,
}

const BookDetails: FC<BookDetailsProps> = ({
  book,
  handleAddToCart,
}: BookDetailsProps): JSX.Element => {
  const [count, setCount] = useState(0);
  const {
    id,
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
              <>
                <br />
                <IndeterminateCheckBox onClick={() => setCount(count - 1)} />
                {count}
                <AddBox onClick={() => setCount(count + 1)} />
                <br />
                <Button onClick={() => handleAddToCart(count, id)} color="secondary" variant="contained">
                  Add to cart
                </Button>
              </>
            )}
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default BookDetails;
