import reducer from './reducers';
import { GET_TRIP_REQUEST_START, GET_TRIP_REQUEST_SUCCESS, GET_TRIP_REQUEST_ERROR } from './types';

describe('Reducers test', () => {
  it('should return the initial state', () => {
    const expectedAction = {
      loading: false,
      count: 0,
      requests: [],
      error: '',
    };

    expect(reducer(undefined, {})).toEqual(expectedAction);
  });

  it('should handle GET_TRIP_REQUEST_START', () => {
    const action = {
      type: GET_TRIP_REQUEST_START,
    };
    const expectedAction = {
      loading: true,
    };

    expect(reducer({}, action)).toEqual(expectedAction);
  });

  it('should handle GET_TRIP_REQUEST_SUCCESS', () => {
    const action = {
      type: GET_TRIP_REQUEST_SUCCESS,
      payload: {
        count: 2,
        rows: [
          { id: 1, reason: 'Business', status: 'Pending' },
          { id: 2, reason: 'Business', status: 'Pending' },
        ],
      },
    };
    const expectedAction = {
      loading: false,
      count: 2,
      requests: [
        { id: 1, reason: 'Business', status: 'Pending' },
        { id: 2, reason: 'Business', status: 'Pending' },
      ],
    };

    expect(reducer({}, action)).toEqual(expectedAction);
  });

  it('should handle GET_TRIP_REQUEST_ERROR', () => {
    const action = {
      type: GET_TRIP_REQUEST_ERROR,
      payload: 'Not Found',
    };
    const expectedAction = {
      error: 'Not Found',
      loading: false,
    };

    expect(reducer({}, action)).toEqual(expectedAction);
  });
});
