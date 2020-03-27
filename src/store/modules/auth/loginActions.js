import jwtDecode from 'jwt-decode';
import history from '../../../utils/helpers/history';
import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_ACCESS_DENIED,
  AUTH_ERROR } from './actionTypes';
import API from '../../../utils/helpers/API';
import successMsg from '../../../utils/helpers/success';
import Errors from '../../../utils/helpers/errorHandle';

export const apiStart = () => ({
  type: AUTH_START
});

export const apiSuccess = payload => ({
  type: AUTH_SUCCESS,
  payload
});

export const accessDenied = url => ({
  type: AUTH_ACCESS_DENIED,
  payload: {
    url
  }
});

export const apiError = error => ({
  type: AUTH_ERROR,
  error
});

export const loginAction = (data) => async (dispatch) => {
  dispatch(apiStart());
  try {
    const { email, password } = data;
    const response = await API.post('/api/auth/login', {
      email,
      password,
    });
    const { token } = response.data.data;
    localStorage.setItem('barefoot_nomad_token', token);
    successMsg.handle(response.data.message);
    return (await dispatch(apiSuccess(jwtDecode(token))) && history.push('/dashboard'));
  } catch (error) {
    Errors.handle(error);
    return dispatch(apiError(error.response.data));
  }
};
export default {
  loginAction,
};
