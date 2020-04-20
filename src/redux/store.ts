import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import booksReducer from '../books/books.reducers';
import usersReducer from '../users/users.reducers';
import ordersReducer from '../orders/orders.reducers';

const rootReducer = combineReducers({
  books: booksReducer,
  users: usersReducer,
  orders: ordersReducer,
});

export default function configureStore() {
  const middleWares = [thunkMiddleware];
  const middleWareEnhancer = applyMiddleware(...middleWares);
  const initialState = {
    books: undefined,
    users: undefined,
    orders: undefined,
  };

  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(middleWareEnhancer),
  );
}
