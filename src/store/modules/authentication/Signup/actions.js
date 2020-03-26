import Errors from '../../../../utils/helpers/errorHandle';
import onSuccess from '../../../../utils/helpers/successMsg';
import history from '../../../../utils/helpers/history';
import {
  SIGN_UP_START,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
} from './actionTypes';
import API from '../../../../utils/helpers/API';

export const apiStart = () => ({
  type: SIGN_UP_START,
});

export const apiSuccess = (payload) => ({
  type: SIGN_UP_SUCCESS,
  payload,
});

export const apiError = (error) => ({
  type: SIGN_UP_ERROR,
  error,
});

export const addUser = (data) => async (dispatch) => {
  dispatch(apiStart());
  try {
    const response = await API.post('/api/auth/signup', data);
    onSuccess.handle('You are successfully registered, verify your email');
    return (dispatch(apiSuccess(response.data.data.user)) && history.push('/login'));
  } catch (error) {
    Errors.handle(error);
    return dispatch(apiError(error));
  }
};
