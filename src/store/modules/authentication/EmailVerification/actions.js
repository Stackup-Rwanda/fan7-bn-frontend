import Errors from '../../../../utils/helpers/errorHandle';
import {
  API_START,
  API_SUCCESS,
  ACCESS_DENIED,
  API_ERROR,
} from './actionTypes';
import API from '../../../../utils/helpers/API';

export const apiStart = () => ({
  type: API_START,
});

export const apiSuccess = (payload) => ({
  type: API_SUCCESS,
  payload,
});

export const accessDenied = (url) => ({
  type: ACCESS_DENIED,
  payload: {
    url,
  },
});

export const apiError = (error) => ({
  type: API_ERROR,
  error,
});

export const confirmUser = (data) => async (dispatch) => {
  dispatch(apiStart());
  try {
    const response = await API.post(`/api/auth/confirmation/${data}`);
    localStorage.setItem('token', data);
    return dispatch(apiSuccess(response.data.data.user));
  } catch (error) {
    Errors.handle(error);
    return dispatch(apiError(error.response.data));
  }
};
