import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import Reducers from './reducers'

const middlewares = [thunk];

const store = createStore(
  Reducers,
  composeWithDevTools(applyMiddleware(...middlewares)),
);

export default store;
