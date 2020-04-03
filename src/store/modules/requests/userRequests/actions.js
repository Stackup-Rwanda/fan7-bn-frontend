import swal from 'sweetalert';
import HttpService from '../../../../utils/HttpService';
import Errors from '../../../../utils/helpers/errors';
import {
    CREATE_REQUEST_START,
    CREATE_REQUEST_SUCCESS,
    CREATE_REQUEST_ERROR,
    GET_REQUEST_START,
    GET_REQUEST_SUCCESS,
    GET_REQUEST_ERROR,
    EDIT_REQUEST_START,
    EDIT_REQUEST_SUCCESS,
    EDIT_REQUEST_ERROR,
    GET_ACCOMMODATIONS_START,
    GET_ACCOMMODATIONS_SUCCESS,
    GET_ACCOMMODATIONS_ERROR
} from './actionTypes';

const create_one_way_trip = (data) => async (dispatch) => {
    console.log(data);
    
    try {
        dispatch({ type: CREATE_REQUEST_START });
        const res = await HttpService.post('/requests/one_way', data);
        window.location.href = '/request';
        dispatch({ type: CREATE_REQUEST_SUCCESS, payload: res.data });
        swal({
            title: 'Success',
            text: 'Request created successfully',
            icon: 'success',
            timer: 3000,
            buttons: 'Close',
          });
    } catch (error) {
        Errors.handle(error);
        dispatch({ type: CREATE_REQUEST_ERROR, payload: Errors.selectMessage(error) });
    }
};
const create_return_trip = (data) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_REQUEST_START });
        const res = await HttpService.post('/requests/return_trip', data);
        window.location.href = '/request';
        dispatch({ type: CREATE_REQUEST_SUCCESS, payload: data });
        swal({
            title: 'Success',
            text: 'Request created successfully',
            icon: 'success',
            timer: 3000,
            buttons: 'Close',
          });
    } catch (error) {
        Errors.handle(error);
        dispatch({ type: CREATE_REQUEST_ERROR, payload: Errors.selectMessage(error) });
    }
};
const create_multi_city_trip = (data) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_REQUEST_START });
        const res = await HttpService.post('/requests/multi_city', data);
        window.location.href = '/request';
        dispatch({ type: CREATE_REQUEST_SUCCESS, payload: res.data });
        swal({
            title: 'Success',
            text: 'Request created successfully',
            icon: 'success',
            timer: 3000,
            buttons: 'Close',
          });
    } catch (error) {
        Errors.handle(error);
        dispatch({ type: CREATE_REQUEST_ERROR, payload: Errors.selectMessage(error) });
    }
};
const get_accommodations = () => async (dispatch) => {
    try {
        dispatch({ type: GET_ACCOMMODATIONS_START });
        const res = await HttpService.get('/accommodations');
        dispatch({ type: GET_ACCOMMODATIONS_SUCCESS, payload: res.data });
    } catch (error) {
        dispatch({ type: GET_ACCOMMODATIONS_ERROR, payload: Errors.selectMessage(error) });
    }
};
const get_requests = () => async (dispatch) => {
    try {
        dispatch({ type: GET_REQUEST_START });
        const res = await HttpService.get('/requests');        
        dispatch({ type: GET_REQUEST_SUCCESS, payload: res.data.rows });
    } catch (error) {
        dispatch({ type: GET_REQUEST_ERROR, payload: Errors.selectMessage(error) });
    }
};
const editTripRequest = (data, id) => async (dispatch) => {
    try {
      dispatch({ type: EDIT_REQUEST_START});

      const updatedTripRequest = await HttpService.patch(`/requests/${id}/update`, data);
  
      dispatch({ type: EDIT_REQUEST_SUCCESS, payload: updatedTripRequest.data });
      swal({
        title: 'Success',
        text: 'Request updated successfully',
        icon: 'success',
        timer: 3000,
        buttons: 'Close',
      });
      window.location.href = '/request';
    } catch (error) {
      Errors.handle(error);
      dispatch({ type: EDIT_REQUEST_ERROR, payload: Errors.selectMessage(error) });
    }
  };
export {
    create_one_way_trip,
    create_return_trip,
    create_multi_city_trip,
    get_accommodations,
    get_requests,
    editTripRequest
  };