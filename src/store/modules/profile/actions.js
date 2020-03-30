import swal from 'sweetalert';
import {
  GET_PROFILE_START,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_ERROR,
  UPDATE_PROFILE_START,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_ERROR,
  GET_TRIPS_SUCCESS,
} from './actionTypes';
import HttpService from '../../../utils/HttpService';
import Errors from '../../../utils/helpers/errors';

const getProfile = () => async dispatch => {
  dispatch({ type: GET_PROFILE_START });
  try {
    const res = await HttpService.get('/profile');

    dispatch({ type: GET_PROFILE_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_PROFILE_ERROR, payload: Errors.selectMessage(error) });
  }
};

const getTrips = () => async dispatch => {
  dispatch({ type: GET_PROFILE_START });
  try {
    const params = { page: 1, numberOfRows: 3 };
    const res = await HttpService.get('/requests', params);

    dispatch({ type: GET_TRIPS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_PROFILE_ERROR, payload: Errors.selectMessage(error) });
  }
};

const updateProfile = data => async dispatch => {
  dispatch({ type: UPDATE_PROFILE_START });
  try {
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    const updatedData = await HttpService.patch('/profile', data, config);

    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: updatedData.data });
    swal({
      title: 'Success',
      text: 'Profile updated successfully',
      icon: 'success',
      timer: 3000,
      buttons: 'Close',
    });
  } catch (error) {
    Errors.handle(error);
    dispatch({ type: UPDATE_PROFILE_ERROR, payload: Errors.selectMessage(error) });
  }
};

export default {
  getProfile,
  getTrips,
  updateProfile,
};
