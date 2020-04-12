import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import moxios from 'moxios';
import { getNotifications, markOneAsRead, markAllAsRead } from './actions';
import { instance } from '../../../utils/API';
import Errors from '../../../utils/helpers/errors';
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

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const onSuccess = (response) => {
  console.debug('Request Successful!', response);
  return response.data;
};

const onError = (error) => {
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

  it('should dispatch a get notifications success action', () => {
    const mockData = {
      data: {
        status: 200,
        responseText: {
          status: 200,
          message: 'All notifications',
          data: [
            {
              id: 8,
              message: 'New request has been created, waiting for approval',
              request_id: 11,
              status: 'unread',
              type: 'Created',
            },
          ],
        },
      },
    };
    const data = [
      {
        id: 8,
        message: 'New request has been created, waiting for approval',
        request_id: 11,
        status: 'unread',
        type: 'Created',
      },
    ];

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      request.respondWith(onSuccess(mockData));
    });

    const expectedActions = [
      { type: GET_NOTIFICATIONS_START },
      {
        type: GET_NOTIFICATIONS_SUCCESS,
        payload: data,
      },
    ];

    const store = mockStore({});

    return store.dispatch(getNotifications()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch get notifications failure action', () => {
    const errorResp = {
      status: 404,
      response: { data: { status: 404, error: 'Not Found.' } },
    };
    const error = { response: { data: { status: 404, error: 'Not Found.' } } };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      request.reject(onError(errorResp));
    });

    const expectedActions = [
      { type: GET_NOTIFICATIONS_START },
      {
        type: GET_NOTIFICATIONS_ERROR,
        payload: Errors.selectMessage(error),
      },
    ];

    const store = mockStore({});

    return store.dispatch(getNotifications()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch mark notification as read success action', () => {
    const mockData = {
      data: {
        status: 200,
        responseText: {
          status: 200,
          message: 'Notification marked as read successfully',
        },
      },
    };
    const notificationId = 1;

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      request.respondWith(onSuccess(mockData));
    });

    const expectedActions = [
      { type: MARK_NOTIFICATION_AS_READ_START },
      {
        type: MARK_NOTIFICATION_AS_READ_SUCCESS,
      },
    ];

    const store = mockStore({});

    return store.dispatch(markOneAsRead(notificationId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch mark notification as read failure action', () => {
    const errorResp = {
      status: 404,
      response: { data: { status: 404, error: 'Not Found.' } },
    };
    const error = { response: { data: { status: 404, error: 'Not Found.' } } };
    const notificationId = 1;

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      request.reject(onError(errorResp));
    });

    const expectedActions = [
      { type: MARK_NOTIFICATION_AS_READ_START },
      {
        type: MARK_NOTIFICATION_AS_READ_ERROR,
        payload: Errors.selectMessage(error),
      },
    ];

    const store = mockStore({});

    return store.dispatch(markOneAsRead(notificationId)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch mark all notifications as read success action', () => {
    const mockData = {
      data: {
        status: 200,
        responseText: {
          status: 200,
          message: 'Notifications marked as read successfully',
        },
      },
    };
    const notificationId = 1;

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      request.respondWith(onSuccess(mockData));
    });

    const expectedActions = [
      { type: MARK_ALL_NOTIFICATIONS_AS_READ_START },
      {
        type: MARK_ALL_NOTIFICATIONS_AS_READ_SUCCESS,
      },
    ];

    const store = mockStore({});

    return store.dispatch(markAllAsRead()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch mark all notifications as read failure action', () => {
    const errorResp = {
      status: 404,
      response: { data: { status: 404, error: 'Not Found.' } },
    };
    const error = { response: { data: { status: 404, error: 'Not Found.' } } };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      request.reject(onError(errorResp));
    });

    const expectedActions = [
      { type: MARK_ALL_NOTIFICATIONS_AS_READ_START },
      {
        type: MARK_ALL_NOTIFICATIONS_AS_READ_ERROR,
        payload: Errors.selectMessage(error),
      },
    ];

    const store = mockStore({});

    return store.dispatch(markAllAsRead()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
