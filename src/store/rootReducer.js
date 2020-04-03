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
import { currentAccommodation, allAccommodations } from './modules/accomodation/reducers';
import { allAccommodationRooms, currentRoom } from './modules/accomodation/roomReducer';

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
  currentAccommodation,
  allAccommodations,
  allAccommodationRooms,
  currentRoom
});

export default rootReducer;
