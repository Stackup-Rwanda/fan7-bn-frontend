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
import HttpService from '../../../utils/HttpService';
import Errors from '../../../utils/helpers/errors';

export const getNotifications = () => async (dispatch) => {
  dispatch({ type: GET_NOTIFICATIONS_START });
  try {
    const res = await HttpService.get('/notifications');
    dispatch({ type: GET_NOTIFICATIONS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_NOTIFICATIONS_ERROR, payload: Errors.selectMessage(error) });
  }
};

export const markOneAsRead = (notificationId) => async (dispatch) => {
  dispatch({ type: MARK_NOTIFICATION_AS_READ_START });
  try {
    const res = await HttpService.patch(`/notifications/${notificationId}/read`);
    dispatch({ type: MARK_NOTIFICATION_AS_READ_SUCCESS });
  } catch (error) {
    Errors.handle(error);
    dispatch({ type: MARK_NOTIFICATION_AS_READ_ERROR, payload: Errors.selectMessage(error) });
  }
};

export const markAllAsRead = () => async (dispatch) => {
  dispatch({ type: MARK_ALL_NOTIFICATIONS_AS_READ_START });
  try {
    const res = await HttpService.patch('/notifications');
    dispatch({ type: MARK_ALL_NOTIFICATIONS_AS_READ_SUCCESS });
  } catch (error) {
    Errors.handle(error);
    dispatch({ type: MARK_ALL_NOTIFICATIONS_AS_READ_ERROR, payload: Errors.selectMessage(error) });
  }
};
