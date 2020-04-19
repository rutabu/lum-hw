import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import configureStore from './redux/store';
import { populateDatabase } from './utils/database';

const store = configureStore();
populateDatabase();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
