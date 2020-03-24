import jwtDecode from 'jwt-decode';
import swal from 'sweetalert';
import history from '../../../utils/helpers/history';
import { LOGIN_SUCCESS, LOGIN_FAILURE, SET_CURRENT_USER } from './actionTypes';
import { axiosCall } from '../../../services/httpservice';

export const successLogin = (payload) => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const LoginError = (payload) => ({
  type: LOGIN_FAILURE,
  payload,
});

export function setCurrentUser(payload) {
  return {
    type: SET_CURRENT_USER,
    payload,
  };
}

export const loginAction = (data) => async (dispatch) => {
  try {
    const { email, password } = data;
    const response = await axiosCall.post('/auth/login', {
      email,
      password,
    });
    const { token } = response.data.data;
    localStorage.setItem('barefoot_nomad_token', token);
    await dispatch(setCurrentUser(jwtDecode(token)));
    await dispatch(successLogin(response.data));
    swal({
      title: 'Sucess login',
      text: `${response.data.message}`,
      icon: 'success',
      timer: 3000,
      buttons: false,
    });
    history.push('/dashboard');
    window.location.assign('/dashboard');
  } catch (error) {
    swal({
      title: 'Login error',
      text: `${error.response.data.message}`,
      icon: 'error',
      timer: 3000,
      buttons: false,
    });
    return dispatch(LoginError(error.response.data));
  }
};
export default {
  loginAction,
};
