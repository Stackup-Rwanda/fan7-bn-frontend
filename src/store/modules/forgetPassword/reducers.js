const initialState = {
  isLoading: false,
  email: '',
  error: null,
};
const forgetEmail = (state = initialState, action) => {
  switch (action.type) {
    case 'FORGOT_PASSWORD_START': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'FORGOT_PASSWORD_SUCCESS': {
      return {
        ...state,
        email: action.payload ,
        error: null,
        isLoading: false,
      };
    }
    case 'FORGOT_PASSWORD_FAILURE': {
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default forgetEmail;
