import React, { FC } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './components/Header';
import Footer from './components/Footer';
import Books from './books/Books';
import Users from './users/Users';
import Orders from './orders/Orders';

const App: FC = () => (
  <>
    <CssBaseline />
    <BrowserRouter>
      <Header />
      <Box pt={12} pb={4}>
        <Container maxWidth="lg">
          <Switch>
            <Route exact path="/" component={Books} />
            <Route exact path="/books" component={Books} />
            <Route exact path="/book/:bookId" component={Books} />
            <Route path="/users" component={Users} />
            <Route path="/orders" component={Orders} />
            <Route path="/order/:orderId" component={Orders} />
          </Switch>
        </Container>
      </Box>
      <Footer />
    </BrowserRouter>
  </>
);

export default App;
