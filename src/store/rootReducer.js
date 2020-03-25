import { combineReducers } from 'redux';
import { authReducers } from './modules/auth';
import loginReducer from './modules/auth/reducers';
import { profileReducers } from './modules/profile';

const rootReducer = combineReducers({
  auth: authReducers,
  user: loginReducer,
  userProfile: profileReducers,
});

export default rootReducer;
