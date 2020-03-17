import { LOGIN_SUCCESS } from './actionTypes';

const INITIAL_STATE = {
  isAutheticated: false,
};

const LoginReducer = (state = INITIAL_STATE, action) => {
  console.log('>>>>>>>>>', action);
  switch (action.type) {
    case LOGIN_SUCCESS:
      return [
        ...state, {
          user: action.payload,
          token: action.payload.token,
          isAutheticated: false,
        },
      ];
    default:
      return state;
  }
};

export default LoginReducer;
