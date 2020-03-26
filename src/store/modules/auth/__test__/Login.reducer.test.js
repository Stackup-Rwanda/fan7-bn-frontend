import React from 'react';
import moxios from 'moxios';
import { shallow, mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import loginReducer  from '../reducers';
import { LOGIN_SUCCESS, LOGIN_FAILURE } from '../actionTypes';

const initialState = {
    isLoading: false,
    user: {},
    message: null,
    isAuthenticated: false,
    error: null,
  };

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


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
