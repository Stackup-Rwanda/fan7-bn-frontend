import reducer from './reducers';
import { BOOKING_START, BOOKING_SUCCESS, BOOKING_ERROR } from './types';

describe('Reducers test', () => {
  it('should return the initial state', () => {
    const expectedAction = {
      data: null,
      loading: false,
      error: null,
    };

    expect(reducer(undefined, {})).toEqual(expectedAction);
  });

  it('should handle BOOKING_START', () => {
    const action = {
      type: BOOKING_START,
    };
    const expectedAction = {
      loading: true,
    };

    expect(reducer({}, action)).toEqual(expectedAction);
  });

  it('should handle BOOKING_SUCCESS', () => {
    const action = {
      type: BOOKING_SUCCESS,
      payload: {
        id: 6,
        checkin: '2021-06-09T00:00:00.000Z',
        checkout: '2021-08-06T00:00:00.000Z',
        accommodation_id: 2,
        room_id: 6,
        user_id: 7,
        trip_id: null,
        updatedAt: '2020-05-03T13:32:09.881Z',
        createdAt: '2020-05-03T13:32:09.881Z',
      },
    };

    const expectedAction = {
      loading: false,
      data: {
        id: 6,
        checkin: '2021-06-09T00:00:00.000Z',
        checkout: '2021-08-06T00:00:00.000Z',
        accommodation_id: 2,
        room_id: 6,
        user_id: 7,
        trip_id: null,
        updatedAt: '2020-05-03T13:32:09.881Z',
        createdAt: '2020-05-03T13:32:09.881Z',
      },
    };

    expect(reducer({}, action)).toEqual(expectedAction);
  });

  it('should handle BOOKING_ERROR', () => {
    const action = {
      type: BOOKING_ERROR,
      payload: 'Not Found',
    };
    const expectedAction = {
      error: 'Not Found',
      loading: false,
    };

    expect(reducer({}, action)).toEqual(expectedAction);
  });
});
