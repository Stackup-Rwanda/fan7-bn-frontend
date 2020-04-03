import { LOGIN_FAILURE, SUCCESS_LOGIN, SUCCESS_GET_USER } from '../actions/types';

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
    case SUCCESS_GET_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: {
          image: payload,
        },
      };
    default:
      return state;
  }
};
