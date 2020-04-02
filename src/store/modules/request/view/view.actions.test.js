import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import moxios from 'moxios';
import { getTripRequests, searchTripRequests } from './actions';
import { instance } from '../../../../utils/API';
import Errors from '../../../../utils/helpers/errors';
import { GET_TRIP_REQUEST_START, GET_TRIP_REQUEST_SUCCESS, GET_TRIP_REQUEST_ERROR } from './types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

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

  it('should dispatch a get requests success action', () => {
    const mockData = {
      data: {
        status: 200,
        responseText: {
          status: 200,
          message: 'All requests',
          data: {
            count: 2,
            rows: [
              { id: 1, reason: 'Business', status: 'Pending' },
              { id: 2, reason: 'Business', status: 'Pending' },
            ],
          },
        },
      },
    };
    const data = {
      count: 2,
      rows: [
        { id: 1, reason: 'Business', status: 'Pending' },
        { id: 2, reason: 'Business', status: 'Pending' },
      ],
    };
    const params = { page: 0, numberOfRows: 0 };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      request.respondWith(onSuccess(mockData));
    });

    const expectedActions = [
      { type: GET_TRIP_REQUEST_START },
      {
        type: GET_TRIP_REQUEST_SUCCESS,
        payload: data,
      },
    ];

    const store = mockStore({});

    return store.dispatch(getTripRequests(params)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch get requests failure action', () => {
    const errorResp = {
      status: 404,
      response: { data: { status: 404, error: 'Not Found.' } },
    };
    const error = { response: { data: { status: 404, error: 'Not Found.' } } };
    const params = { page: 0, numberOfRows: 0 };

    moxios.wait(() => { 
      const request = moxios.requests.mostRecent();

      request.reject(onError(errorResp));
    });

    const expectedActions = [
      { type: GET_TRIP_REQUEST_START },
      {
        type: GET_TRIP_REQUEST_ERROR,
        payload: Errors.selectMessage(error),
      },
    ];

    const store = mockStore({});

    return store.dispatch(getTripRequests(params)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
