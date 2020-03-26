import {
  FORGOT_PASSWORD_START,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
} from './actionTypes';
import API from '../../../utils/helpers/API';
import Errors from '../../../utils/helpers/errorHandle';
import successMsg from '../../../utils/helpers/success';

export const apiStart = () => ({
  type: FORGOT_PASSWORD_START,
});
export const apiSuccess = (payload) => ({
  type: FORGOT_PASSWORD_SUCCESS,
  payload,
});
export const apiError = (error) => ({
  type: FORGOT_PASSWORD_FAILURE,
  error,
});

const sendEmail = (data) => async (dispatch) => {
  dispatch(apiStart());
  try {
    const response = await API.post('/api/auth/forget', data);
    successMsg.handle(response.data.message);
    return dispatch(apiSuccess(response.data.message));
  } catch (error) {
    Errors.handle(error);
    return dispatch(apiError(error.response.data));
  }
};

export default sendEmail;
