import forgetReducer from './reducers';

describe('forget password reducer tests',() => {
    const initialState = {
        isLoading: false,
        email: '',
        error: null,
      };
  it('should return the initial state', () => {
      expect(forgetReducer(undefined, {})).toEqual(initialState);
  });
  it('should handle FORGOT_PASSWORD_START', () => {
    const payload = {
        isLoading: true
    }
    const newState = forgetReducer(initialState, {
        type: 'FORGOT_PASSWORD_START',
        payload: payload
    });
    expect(newState.isLoading).toBeTruthy();
  });
  it('should handle FORGOT_PASSWORD_SUCCESS', () => {
    const payload = {
        email: 'fantastic@gmail.com',
        isLoading: false
    }
      const newState = forgetReducer(initialState, {
          type: 'FORGOT_PASSWORD_SUCCESS',
          payload
    });
    expect(newState.isLoading).toBeFalsy();
  });
  it('should handle FORGOT_PASSWORD_FAILURE', () => {
      const payload = {
          isLoading: false
      }
      const newState = forgetReducer(initialState, {
          type: 'FORGOT_PASSWORD_FAILURE',
          payload: payload
        });
      expect(newState.isLoading).toBeFalsy();
  });
})