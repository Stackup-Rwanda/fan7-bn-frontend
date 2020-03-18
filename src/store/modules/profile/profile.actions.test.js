import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import moxios from 'moxios';
import actions from './actions';
import { instance } from '../../../utils/API';
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

const onSuccess = response => {
  console.debug('Request Successful!', response);
  return response.data;
};

const onError = error => {
  console.error('Request Failed:', error);
  return error;
};

describe('Should dispatch the right action', () => {
  beforeEach(() => {
    moxios.install(instance);
  });
  afterEach(() => {
    moxios.uninstall(instance);
  });

  it('should dispatch a get profile success action', () => {
    const mockData = {
      data: {
        status: 200,
        responseText: {
          status: 200,
          message: 'User profile data',
          data: {
            email: 'elvisrugamba@gmail.com',
          },
        },
      },
    };
    const data = {
      email: 'elvisrugamba@gmail.com',
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      request.respondWith(onSuccess(mockData));
    });

    const expectedActions = [
      { type: GET_PROFILE_START },
      {
        type: GET_PROFILE_SUCCESS,
        payload: data,
      },
    ];

    const store = mockStore({});

    return store.dispatch(actions.getProfile()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch get profile failure action', () => {
    const errorResp = {
      status: 404,
      response: { data: { status: 404, error: 'Not Found.' } },
    };
    const error = 'Not Found.';

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      request.reject(onError(errorResp));
    });

    const expectedActions = [
      { type: GET_PROFILE_START },
      {
        type: GET_PROFILE_ERROR,
        payload: error,
      },
    ];

    const store = mockStore({});

    return store.dispatch(actions.getProfile()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch a get trips success action', () => {
    const mockData = {
      data: {
        status: 200,
        responseText: {
          status: 200,
          message: 'Trip requests',
          data: {
            trips: [{ destination: 'Nigeria, Lagos' }],
          },
        },
      },
    };
    const data = {
      trips: [{ destination: 'Nigeria, Lagos' }],
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      request.respondWith(onSuccess(mockData));
    });

    const expectedActions = [
      { type: GET_PROFILE_START },
      {
        type: GET_TRIPS_SUCCESS,
        payload: data,
      },
    ];

    const store = mockStore({});

    return store.dispatch(actions.getTrips()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch get trips failure action', () => {
    const errorResp = {
      status: 404,
      response: { data: { status: 404, error: 'Not Found.' } },
    };
    const error = 'Not Found.';

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      request.reject(onError(errorResp));
    });

    const expectedActions = [
      { type: GET_PROFILE_START },
      {
        type: GET_PROFILE_ERROR,
        payload: error,
      },
    ];

    const store = mockStore({});

    return store.dispatch(actions.getTrips()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch update profile success action', () => {
    const mockData = {
      data: {
        status: 200,
        responseText: {
          status: 200,
          message: 'Profile updated successfully',
          data: {
            email: 'elvisrugamba@gmail.com',
          },
        },
      },
    };
    const data = {
      email: 'elvisrugamba@gmail.com',
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      request.respondWith(onSuccess(mockData));
    });

    const expectedActions = [
      { type: UPDATE_PROFILE_START },
      {
        type: UPDATE_PROFILE_SUCCESS,
        payload: data,
      },
    ];

    const store = mockStore({});

    return store.dispatch(actions.updateProfile(data)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch apdate profile failure action', () => {
    const errorResp = {
      status: 422,
      response: { data: { status: 422, error: 'Invalid Email.' } },
    };
    const error = 'Invalid Email.';
    const data = {
      email: 'elvisrugamba.com',
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      request.reject(onError(errorResp));
    });

    const expectedActions = [
      { type: UPDATE_PROFILE_START },
      {
        type: UPDATE_PROFILE_ERROR,
        payload: error,
      },
    ];

    const store = mockStore({});

    return store.dispatch(actions.updateProfile(data)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
