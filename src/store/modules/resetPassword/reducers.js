import { RESET_PASSWORD_FAILURE, RESET_PASSWORD_START, RESET_PASSWORD_SUCCESS } from './actionTypes';

const initialState = {
  isLoading: false,
  password: '',
  cpassword: '',
  error: null,
};

const resetPassword = (state = initialState, action) => {
  switch (action.type) {
    case RESET_PASSWORD_START:
      return {
        ...state,
        isLoading: true,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        message: action.payload,
        isLoading: false,
      };
    case RESET_PASSWORD_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    default: {
      return state;
    }
  }
};
export default resetPassword;
