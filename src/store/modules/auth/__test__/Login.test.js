import { successLogin, LoginError, setCurrentUser } from '../../../../store/modules/auth/actions';
import { LOGIN_SUCCESS, LOGIN_FAILURE, SET_CURRENT_USER } from '../../../../store/modules/auth/actionTypes';
import loginReducer  from '../../../../store/modules/auth/reducers';

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
        expect(successLogin(payload)).toStrictEqual({
            type: LOGIN_SUCCESS,
            payload,
        });
    });
    it('Should call the action loginfailure', () => {
        const payload = {
          value: 'value',
        };
        expect(LoginError(payload)).toStrictEqual({
          type: 'LOGIN_FAILURE',
          payload,
        });
      });
      it('Should call the action setCurrentUser', () => {
        const payload = {
          value: 'value',
        };
        expect(setCurrentUser(payload)).toStrictEqual({
          type: 'SET_CURRENT_USER',
          payload,
        });
      });
})

// Login reducer tests

describe('Login Reducers', () => {
    it('should update the state when calling LOGIN_SUCESS', () => {
      const payload = {
        status: 200,
        message: 'message',
        data: 'data',
      };
      const newState = loginReducer(initialState, {
        type: LOGIN_SUCCESS,
        payload,
      });
      expect(newState.isAuthenticated).toBe(true);
    });
    it('should update the state when calling LOGIN_FAILURE', () => {
      const payload = 'error';
      const newState = loginReducer(initialState, {
        type: LOGIN_FAILURE,
        payload,
      });
      expect(newState.isAuthenticated).toBe(false);
    });
  });
