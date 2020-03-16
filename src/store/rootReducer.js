import { combineReducers } from 'redux';
import { authReducers } from './modules/auth';

const rootReducer = combineReducers({
  auth: authReducers,
});

export default rootReducer;
