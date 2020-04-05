import {
  apiStart,
  apiSuccess,
  accessDenied,
  apiError,
  loginAction } from '../loginActions';
import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_ACCESS_DENIED,
  AUTH_ERROR } from '../actionTypes';
import loginReducer  from '../reducers';

const initialState = {
    isLoading: false,
    user: {},
    message: null,
    isAuthenticated: false,
    error: null,
  };

//Login Actions tests
describe('Login testing suite', () => {
    it('It should call Login action', () => {
        const payload = {
            value: 'value'
        }
        expect(apiSuccess(payload)).toStrictEqual({
            type: AUTH_SUCCESS,
            payload,
        });
    });
    it('Should call the action loginfailure', () => {
        const payload = {
          value: 'value',
        };
        expect(apiError(payload)).toStrictEqual({
          type: 'AUTH_ERROR',
          error: payload,
        });
      });
})

// Login reducer tests

describe('Login Reducers', () => {
    it('should update the state when calling AUTH_SUCESS', () => {
      const payload = {
        status: 200,
        message: 'message',
        data: 'data',
      };
      const newState = loginReducer(initialState, {
        type: AUTH_SUCCESS,
        payload,
      });
      expect(newState.isAuthenticated).toBe(true);
    });
    it('should update the state when calling AUTH_ERROR', () => {
      const payload = 'error';
      const newState = loginReducer(initialState, {
        type: AUTH_ERROR,
        payload,
      });
      expect(newState.isAuthenticated).toBe(false);
    });
  });
