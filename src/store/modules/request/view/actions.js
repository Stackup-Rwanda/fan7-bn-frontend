import { toast } from "react-toastify";
import {
  GET_TRIP_REQUEST_START,
  GET_TRIP_REQUEST_SUCCESS,
  GET_TRIP_REQUEST_ERROR,
  APPROVE_REJECT_SUCCESS,
  APPROVE_REJECT_ERROR,
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

export const ApproveReject = (id, status) => async dispatch => {
  try {
    const response = await HttpService.patch(`/requests/${id}/${status}`);
    dispatch({type: APPROVE_REJECT_SUCCESS, payload: response.data});
    console.log(response.data);
    
    toast.success(`Request Successfuly ${response.data.status}`, {
      position: toast.POSITION.TOP_RIGHT
    })
  } catch (error) {
    dispatch({ type: APPROVE_REJECT_ERROR, payload: error.response.data});
    toast.error(`${error.response.data.error}`, {
      position: toast.POSITION.TOP_RIGHT
    });
  }
}
