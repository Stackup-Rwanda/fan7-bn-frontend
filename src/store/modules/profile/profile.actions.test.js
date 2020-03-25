import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import moxios from 'moxios';
import actions from './actions';
import AuthService from '../../../utils/AuthService';
import API from '../../../utils/API';
import {
  GET_PROFILE_START,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_ERROR,
  UPDATE_PROFILE_START,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_ERROR,
  GET_TRIPS_SUCCESS,
} from './actionTypes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../../../utils/AuthService');
// jest.mock('../../../utils/HttpService');
// jest.mock('../../../utils/API');

const onSuccess = response => {
  console.debug('Request Successful!', response);
  return response.data;
};

const onError = error => {
  console.error('Request Failed:', error.config);
  return Promise.reject(error);
};

describe('Should dispatch the right action', () => {
  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJlbHZpc3J1Z2FtYmFAZ21haWwuY29tIiwicm9sZSI6Im1hbmFnZXIiLCJpYXQiOjE1ODIyOTY0Mzl9.gwq-S5fGQ1Z2nq19CYfpyhW_Ppe1bRYKYJTZXmYOYj8`;

  let axiosInstance;
  beforeEach(() => {
    axiosInstance = axios.create();
    moxios.install(axiosInstance);
  });
  afterEach(() => {
    moxios.uninstall(axiosInstance);
  });
  beforeAll(() => {
    // window.localStorage.setItem('barefoot_nomad_token', token);
    // AuthService.setToken(token);
    // expect(AuthService.setToken).toHaveBeenCalled();
  });

  it('should dispatch a get profile success action', done => {
    const mockData = {
      status: 200,
      message: 'User profile data',
      data: {
        email: 'elvisrugamba@gmail.com',
      },
    };
    const data = {
      email: 'elvisrugamba@gmail.com',
    };

    moxios.stubRequest('https://barefoot-nomad-staging.herokuapp.com/api/profile', {
      status: 200,
      response: mockData,
    });

    const expectedActions = [
      { type: GET_PROFILE_START },
      {
        type: GET_PROFILE_SUCCESS,
        payload: data,
      },
    ];

    const store = mockStore({});

    return store
      .dispatch(actions.getProfile())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .finally(done());
  });

  it('should dispatch get profile failure action', done => {
    const errorResp = {
      status: 422,
      response: { status: 422, error: 'Invalid Email.' },
    };
    const error = 'Invalid Email.';

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(onError(errorResp));
    });

    const expectedActions = [
      { type: GET_PROFILE_START },
      {
        type: GET_PROFILE_ERROR,
        payload: error,
      },
    ];

    const store = mockStore({});

    return store
      .dispatch(actions.getProfile())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .finally(done());
  });

  it('should dispatch a get trips success action', done => {
    const mockData = {
      status: 200,
      message: 'Trip requests',
      data: {
        trips: [{destination: 'Nigeria, Lagos'}],
      },
    };
    const data = {
      trips: [{destination: 'Nigeria, Lagos'}],
    };

    moxios.stubRequest('https://barefoot-nomad-staging.herokuapp.com/api/requests', {
      status: 200,
      response: mockData,
    });

    const expectedActions = [
      { type: GET_PROFILE_START },
      {
        type: GET_TRIPS_SUCCESS,
        payload: data,
      },
    ];

    const store = mockStore({});

    return store
      .dispatch(actions.getProfile())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .finally(done());
  });

  it('should dispatch update profile success action', done => {
    const mockData = {
      status: 200,
      message: 'User profile updated',
      data: {
        email: 'elvisrugamba@gmail.com',
      },
    };
    const data = {
      email: 'elvisrugamba@gmail.com',
    };

    moxios.stubRequest('https://barefoot-nomad-staging.herokuapp.com/api/profile', {
      status: 200,
      response: mockData,
    });

    const expectedActions = [
      { type: UPDATE_PROFILE_START },
      {
        type: UPDATE_PROFILE_SUCCESS,
        payload: data,
      },
    ];

    const store = mockStore({});

    return store
      .dispatch(actions.getProfile())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .finally(done());
  });

  it('should dispatch apdate profile failure action', done => {
    const errorResp = {
      status: 422,
      response: { status: 422, error: 'Invalid Email.' },
    };
    const error = 'Invalid Email.';

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(onError(errorResp));
    });

    const expectedActions = [
      { type: UPDATE_PROFILE_START },
      {
        type: UPDATE_PROFILE_ERROR,
        payload: error,
      },
    ];

    const store = mockStore({});

    return store
      .dispatch(actions.getProfile())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .finally(done());
  });
});
