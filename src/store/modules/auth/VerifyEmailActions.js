import jwtDecode from 'jwt-decode';
import Errors from '../../../utils/helpers/errorHandle';
import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_ERROR
} from './actionTypes';
import API from '../../../utils/helpers/API';
import successMsg from '../../../utils/helpers/success';

export const apiStart = () => ({
  type: AUTH_START
});

export const apiSuccess = payload => ({
  type: AUTH_SUCCESS,
  payload
});

export const apiError = error => ({
  type: AUTH_ERROR,
  error
});

export const confirmUser = data => async dispatch => {
  dispatch(apiStart());
  try {
    const response = await API.post(`/api/auth/confirmation/${data}`);
    console.log(response.data)
    const { token } = response.data.data;
    localStorage.setItem('barefoot_nomad_token', token);
    await dispatch(apiSuccess(await jwtDecode(token)));
    return successMsg.handle('Your account was successfully verified');
  } catch (error) {
    Errors.handle(error);
    return dispatch(apiError(error.response.data));
  }
};
