import forgetReducer from '../reducers';

describe('signup email verification reducer tests', () => {
  const initialState = {
    isLoading: false,
    user: {},
    isAuthenticated: false,
    error: null,
  };

  it('should return the initial state', () => {
    expect(forgetReducer(undefined, {})).toEqual(initialState);
  });
  it('should handle email verification AUTH_START', () => {
    const payload = {
      isLoading: true,
    };
    const newState = forgetReducer(initialState, {
      type: 'AUTH_START',
      payload,
    });
    expect(newState.isLoading).toBeTruthy();
  });
  it('should handle email verification AUTH_SUCCESS', () => {
    const payload = {
      user: {
        email: 'fantastic@gmail.com',
        password: 'Bobo1234',
        userName: 'bobo',
        image_url: null
      },
      isAuthenticated: false,
      error: null,
      isLoading: false,
    };
    const newState = forgetReducer(initialState, {
      type: 'AUTH_SUCCESS',
      user: { ...payload.user },
      isAuthenticated: true,
      error: null,
    });
    expect(newState.isLoading).toBeFalsy();
  });
  it('should handle email verification AUTH_ERROR', () => {
    const payload = {
      isLoading: false,
    };
    const newState = forgetReducer(initialState, {
      type: 'AUTH_ERROR',
      user: {},
      isAuthenticated: false,
      error: { ...payload.error },
    });
    expect(newState.isLoading).toBeFalsy();
  });
});
