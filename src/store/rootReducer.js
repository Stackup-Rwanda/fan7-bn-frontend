import { combineReducers } from 'redux';
import { authReducers } from './modules/auth';
import currentUser from './modules/auth/reducers';
import { profileReducers } from './modules/profile';
import roleReducers from './modules/role/reducer';
import socialReducer from './reducers/socialReducer';

import signUpUser from './modules/authentication/Signup/reducers';
import forgetEmail from './modules/forgetPassword/reducers';
import resetPassword from './modules/resetPassword/reducers';

const rootReducer = combineReducers({
  auth: authReducers,
  userProfile: profileReducers,
  currentUser,
  signUpUser,
  forgetEmail,
  resetPassword,
  role: roleReducers,
  social: socialReducer,
});

export default rootReducer;
