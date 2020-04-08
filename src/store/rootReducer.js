import { combineReducers } from 'redux';
import { authReducers } from './modules/auth';
import loginReducer from './modules/auth/reducers';
import { profileReducers } from './modules/profile';
import roleReducers from './modules/role/reducer';
import socialReducer from './reducers/socialReducer';
import currentUser from './modules/authentication/EmailVerification/reducers';
import signUpUser from './modules/authentication/Signup/reducers';
import forgetEmail from './modules/forgetPassword/reducers';
import resetPassword from './modules/resetPassword/reducers';
import viewRequests from './modules/request/view/reducers';
import notifications from './modules/notification/reducers';
import chatReducer from './reducers/chatReducer';

const rootReducer = combineReducers({
  auth: authReducers,
  user: loginReducer,
  userProfile: profileReducers,
  currentUser,
  signUpUser,
  forgetEmail,
  resetPassword,
  role: roleReducers,
  social: socialReducer,
  viewRequests,
  notifications,
  chat: chatReducer,
});

export default rootReducer;
