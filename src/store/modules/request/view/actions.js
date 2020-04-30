import swal from 'sweetalert';
import axios from 'axios';
import {
  GET_TRIP_REQUEST_START,
  GET_TRIP_REQUEST_SUCCESS,
  GET_TRIP_REQUEST_ERROR,
  APPROVE_REJECT_SUCCESS,
  APPROVE_REJECT_ERROR,
  TRIPS_STATS_BEGIN,
  TRIPS_STATS_SUCCESS,
  TRIPS_STATS_ERROR
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
    swal({
      text: `Request Successfuly ${response.data.status}`,
      icon: 'success',
      timer: 3000,
      buttons: false,
    })
  } catch (error) {
    dispatch({ type: APPROVE_REJECT_ERROR, payload: Errors.selectMessage(error)})
  }
}

export const getTripStatistics = (data) => async dispatch => {
  dispatch({ type: GET_TRIP_REQUEST_START });
  try {
    const { startDate, endDate } = data;
       const res = await HttpService.get(`requests/statistics`,
        { 
        startDate, 
         endDate 
        });
    
    dispatch({ type: TRIPS_STATS_SUCCESS, payload: res });
  } catch (error) {
    dispatch({ type: TRIPS_STATS_ERROR, payload: Errors.selectMessage(error) });
  }
};