import { combineReducers } from 'redux';
import { authReducers } from './modules/auth';
import loginReducer from './modules/auth/reducers';

const rootReducer = combineReducers({
  auth: authReducers,
  user: loginReducer,
});

export default rootReducer;
