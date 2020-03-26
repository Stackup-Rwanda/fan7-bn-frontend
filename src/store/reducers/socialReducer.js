import { LOGIN_FAILURE, SUCCESS_LOGIN } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {},
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SUCCESS_LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        error: 'Something went wrong, try again please',
      };
    default:
      return state;
  }
};
