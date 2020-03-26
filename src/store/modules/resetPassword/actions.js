import {
  RESET_PASSWORD_START,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
} from './actionTypes';

import API from '../../../utils/helpers/API';
import Errors from '../../../utils/helpers/errorHandle';
import successMsg from '../../../utils/helpers/success';

export const apiStart = () => ({
  type: RESET_PASSWORD_START,
});

export const apiSuccess = (payload) => ({
  type: RESET_PASSWORD_SUCCESS,
  payload,
});

export const apiError = (error) => ({
  type: RESET_PASSWORD_FAILURE,
  error,
});

const updatePassword = (data) => async (dispatch) => {
  dispatch(apiStart());
  try {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const token = urlParams.get('token');
    const email = urlParams.get('email');
    const response = await API.patch(`/api/auth/reset/${email}/${token}`, data); 
    successMsg.handle(response.data.message);
    return dispatch(apiSuccess(response.data.message));
  } catch (error) {
    Errors.handle(error);
    return dispatch(apiError(error.response.data));
  }
};

export default updatePassword;
