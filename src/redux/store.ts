import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import booksReducer from '../books/books.reducers';

const rootReducer = combineReducers({
  books: booksReducer,
});

export default function configureStore() {
  const middleWares = [thunkMiddleware];
  const middleWareEnhancer = applyMiddleware(...middleWares);
  const initialState = {
    books: undefined,
  };

  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(middleWareEnhancer),
  );
}
