import { combineReducers } from 'redux';
import { authReducers } from './modules/auth';
import loginReducer from './modules/index';

const rootReducer = combineReducers({
  auth: authReducers,
  login: loginReducer,
});

export default rootReducer;
