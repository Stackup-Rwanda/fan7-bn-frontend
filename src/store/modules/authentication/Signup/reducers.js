// root reducer codes

const initialState = {
  isLoading: false,
  user: {},
  error: null,
};

const signUpUser = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGN_UP_START': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'SIGN_UP_SUCCESS': {
      return {
        ...state,
        user: { ...action.payload },
        error: null,
        isLoading: false,
      };
    }
    case 'SIGN_UP_ERROR': {
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


export default signUpUser;
