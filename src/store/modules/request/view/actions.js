import {
  GET_TRIP_REQUEST_START,
  GET_TRIP_REQUEST_SUCCESS,
  GET_TRIP_REQUEST_ERROR,
} from './types';
import HttpService from '../../../../utils/HttpService';
import Errors from '../../../../utils/helpers/errors';

export const getTripRequests = (page, limit) => async dispatch => {
  dispatch({ type: GET_TRIP_REQUEST_START });
  try {
    const res = await HttpService.get(`/requests?page=${page}&numberOfRows=${limit}`);

    dispatch({ type: GET_TRIP_REQUEST_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_TRIP_REQUEST_ERROR, payload: Errors.selectMessage(error) });
  }
};
