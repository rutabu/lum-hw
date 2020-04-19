import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const Footer = () => (
  <Box pl={3} pr={3} pb={3}>
    <Typography variant="body2" color="textSecondary" component="p">
      &copy; Copyright 2020 Books
    </Typography>
  </Box>
);

export default Footer;
