import forgetReducer from './reducers';

describe('signup reducer tests', () => {
  const initialState = {
    isLoading: false,
    user: {},
    error: null,
  };

  it('should return the initial state', () => {
    expect(forgetReducer(undefined, {})).toEqual(initialState);
  });
  it('should handle SIGN_UP_START', () => {
    const payload = {
      isLoading: true,
    };
    const newState = forgetReducer(initialState, {
      type: 'SIGN_UP_START',
      payload,
    });
    expect(newState.isLoading).toBeTruthy();
  });
  it('should handle SIGN_UP_SUCCESS', () => {
    const payload = {
      email: 'fantastic@gmail.com',
      isLoading: false,
    };
    const newState = forgetReducer(initialState, {
      type: 'SIGN_UP_SUCCESS',
      payload,
    });
    expect(newState.isLoading).toBeFalsy();
  });
  it('should handle SIGN_UP_ERROR', () => {
    const payload = {
      isLoading: false,
    };
    const newState = forgetReducer(initialState, {
      type: 'SIGN_UP_ERROR',
      payload,
    });
    expect(newState.isLoading).toBeFalsy();
  });
});
