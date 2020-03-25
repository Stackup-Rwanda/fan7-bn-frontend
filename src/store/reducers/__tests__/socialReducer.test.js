import socialReducer from '../socialReducer';
import { SUCCESS_LOGIN, LOGIN_FAILURE, SUCCESS_GET_USER } from '../../actions/types';

describe('Social Login Reducer Tests', () => {
  it('Should SET isAuthenticate to true on SUCCESS log in', () => {
    const success = {
      type: SUCCESS_LOGIN,
      payload: {
        id: 1,
        name: 'Mistico',
      },
    };
    const newState = socialReducer(undefined, success);
    expect(newState).toEqual({
      isAuthenticated: true,
      user: success.payload,
      error: null,
    });
  });
  it('Should SET isAuthenticate to false on log in fail', () => {
    const fail = {
      type: LOGIN_FAILURE,
      payload: 'Fail',
    };
    const newState = socialReducer(undefined, fail);
    expect(newState).toEqual({
      isAuthenticated: false,
      user: {},
      error: 'Something went wrong, try again please',
    });
  });
  it('Should GET user info', () => {
    const GET_USER = {
      type: SUCCESS_GET_USER,
      payload: 'www.jpeg.com',
    };
    const newState = socialReducer(undefined, GET_USER);
    expect(newState).toEqual({
      isAuthenticated: true,
      user: {
        image: GET_USER.payload,
      },
      error: null,
    });
  });
  it('Should return default state', () => {
    const defaultState = {
      type: 'DEFAULT',
      payload: 'none',
    };
    const newState = socialReducer(undefined, defaultState);
    expect(newState).toEqual({
      isAuthenticated: false,
      user: {},
      error: null,
    });
  });
});
