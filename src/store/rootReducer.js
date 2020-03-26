import { combineReducers } from 'redux';
import { authReducers } from './modules/auth';
import loginReducer from './modules/auth/reducers';
import { profileReducers } from './modules/profile';

import currentUser from './modules/authentication/EmailVerification/reducers';
import signUpUser from './modules/authentication/Signup/reducers';

import forgetEmail from './modules/forgetPassword/reducers';
import resetPassword from './modules/resetPassword/reducers';

const rootReducer = combineReducers({
  auth: authReducers,
  user: loginReducer,
  userProfile: profileReducers,
  currentUser,
  signUpUser,
  forgetEmail,
  resetPassword
});

export default rootReducer;
