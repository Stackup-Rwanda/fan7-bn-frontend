import reducer from './reducers';
import {
  GET_NOTIFICATIONS_START,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_ERROR,
  MARK_NOTIFICATION_AS_READ_START,
  MARK_NOTIFICATION_AS_READ_SUCCESS,
  MARK_NOTIFICATION_AS_READ_ERROR,
  MARK_ALL_NOTIFICATIONS_AS_READ_START,
  MARK_ALL_NOTIFICATIONS_AS_READ_SUCCESS,
  MARK_ALL_NOTIFICATIONS_AS_READ_ERROR,
} from './types';

describe('Reducers test', () => {
  it('should return the initial state', () => {
    const expectedAction = {
      loading: false,
      notifications: [],
      error: null,
    };

    expect(reducer(undefined, {})).toEqual(expectedAction);
  });

  it('should handle GET_NOTIFICATIONS_START', () => {
    const action = {
      type: GET_NOTIFICATIONS_START,
    };
    const expectedAction = {
      loading: true,
    };

    expect(reducer({}, action)).toEqual(expectedAction);
  });

  it('should handle GET_NOTIFICATIONS_SUCCESS', () => {
    const action = {
      type: GET_NOTIFICATIONS_SUCCESS,
      payload: [
        {
          id: 8,
          message: 'New request has been created, waiting for approval',
          request_id: 11,
          status: 'unread',
          type: 'Created',
        },
      ],
    };

    const expectedAction = {
      loading: false,
      notifications: [
        {
          id: 8,
          message: 'New request has been created, waiting for approval',
          request_id: 11,
          status: 'unread',
          type: 'Created',
        },
      ],
    };

    expect(reducer({}, action)).toEqual(expectedAction);
  });

  it('should handle GET_NOTIFICATIONS_ERROR', () => {
    const action = {
      type: GET_NOTIFICATIONS_ERROR,
      payload: 'Not Found',
    };
    const expectedAction = {
      error: 'Not Found',
      loading: false,
    };

    expect(reducer({}, action)).toEqual(expectedAction);
  });

  it('should handle MARK_NOTIFICATION_AS_READ_START', () => {
    const action = {
      type: MARK_NOTIFICATION_AS_READ_START,
    };
    const expectedAction = {
      loading: true,
    };

    expect(reducer({}, action)).toEqual(expectedAction);
  });

  it('should handle MARK_NOTIFICATION_AS_READ_SUCCESS', () => {
    const action = {
      type: MARK_NOTIFICATION_AS_READ_SUCCESS,
    };

    const expectedAction = {
      loading: false,
    };

    expect(reducer({}, action)).toEqual(expectedAction);
  });

  it('should handle MARK_NOTIFICATION_AS_READ_ERROR', () => {
    const action = {
      type: MARK_NOTIFICATION_AS_READ_ERROR,
      payload: 'Not Found',
    };
    const expectedAction = {
      error: 'Not Found',
      loading: false,
    };

    expect(reducer({}, action)).toEqual(expectedAction);
  });

  it('should handle MARK_ALL_NOTIFICATIONS_AS_READ_START', () => {
    const action = {
      type: MARK_ALL_NOTIFICATIONS_AS_READ_START,
    };
    const expectedAction = {
      loading: true,
    };

    expect(reducer({}, action)).toEqual(expectedAction);
  });

  it('should handle MARK_ALL_NOTIFICATIONS_AS_READ_SUCCESS', () => {
    const action = {
      type: MARK_ALL_NOTIFICATIONS_AS_READ_SUCCESS,
    };

    const expectedAction = {
      loading: false,
    };

    expect(reducer({}, action)).toEqual(expectedAction);
  });

  it('should handle MARK_ALL_NOTIFICATIONS_AS_READ_ERROR', () => {
    const action = {
      type: MARK_ALL_NOTIFICATIONS_AS_READ_ERROR,
      payload: 'Not Found',
    };
    const expectedAction = {
      error: 'Not Found',
      loading: false,
    };

    expect(reducer({}, action)).toEqual(expectedAction);
  });
});
