import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import moxios from 'moxios';
import { successLogin, LoginError, setCurrentUser, loginAction } from '../../../../store/modules/auth/actions';
import { axiosCall } from '../../../../services/httpservice';
import { LOGIN_SUCCESS, LOGIN_FAILURE, SET_CURRENT_USER } from '../../../../store/modules/auth/actionTypes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);


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

describe('Login dispatch actions', () => {
    let store;
    beforeEach(()=>{
      store = mockStore({
        isAuthenticated: false,
        message: null,
        error: null
      });
    });
    beforeEach(() => {
      moxios.install(axiosCall);
    });
  
    afterEach(() => {
      moxios.uninstall(axiosCall);
    });
  
    it('should dispatch local Login action', () => {
      const payload = {
        email: 'fantastic7@gmail.com',
        password: 'Kemmy123'
      };
      store.dispatch(loginAction(payload));
    });
    it('should reject local Login action', () => {
      const payload = {
        status: 404,
        error: 'error'
      };
      store.dispatch(loginAction(payload));
    });
  
  });
  

