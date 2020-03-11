import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import Reducers from './reducers'

const middleware = [thunk];

const store = createStore(
  Reducers,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
