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

const initialState = {
  loading: false,
  notifications: [],
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_NOTIFICATIONS_START:
      return { ...state, loading: true };

    case GET_NOTIFICATIONS_SUCCESS:
      return { ...state, loading: false, notifications: payload };

    case GET_NOTIFICATIONS_ERROR:
      return { ...state, loading: false, error: payload };

    case MARK_NOTIFICATION_AS_READ_START:
      return { ...state, loading: true };

    case MARK_NOTIFICATION_AS_READ_SUCCESS:
      return { ...state, loading: false };

    case MARK_NOTIFICATION_AS_READ_ERROR:
      return { ...state, loading: false, error: payload };

    case MARK_ALL_NOTIFICATIONS_AS_READ_START:
      return { ...state, loading: true };

    case MARK_ALL_NOTIFICATIONS_AS_READ_SUCCESS:
      return { ...state, loading: false };

    case MARK_ALL_NOTIFICATIONS_AS_READ_ERROR:
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
};
