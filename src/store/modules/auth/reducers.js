import { LOGIN_SUCCESS, LOGIN_FAILURE } from './actionTypes';

const INITIAL_STATE = {
  isLoading: false,
  user: {},
  isAuthenticated: false,
  error: null,
};


const LoginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: true,
        user: action.payload,
        isAuthenticated: true,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        user: {},
        isAuthenticated: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default LoginReducer;
