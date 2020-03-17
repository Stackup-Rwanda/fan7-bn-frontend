import history from '../../../utils/helpers/history';
import { LOGIN_SUCCESS, LOGIN_FAILURE } from './actionTypes';
import httpService from '../../../services/httpservice';

const { setToken, http } = httpService;
export const successLogin = (user) => ({
    type: LOGIN_SUCCESS,
    payload: {
      user,
      isLoading: true,
      isAuthenticated: true,
    },
  });
  
  export const loginError = (error) => ({
    type: LOGIN_FAILURE,
    payload: {
      error,
      isLoading: false,
      isAuthenticated: false,
    },
  });
  
  export const loginAction = (data) => async (dispatch) => {
    try {
      const response = http.post({
        path: '/auth/login',
        payload: data,
      });
      dispatch(setToken(response.user.data.token));
      localStorage.setItem(response.user);
      dispatch(successLogin(response.user));
      history.push('/dashboard');
      window.location.assign('/dashboard');
    } catch (error) {
      const { result } = error;
      if (!result) {
        dispatch(loginError('Something went wrong try again'));
        return;
      }
      console.log('Invalid credentials');
    }
  };

  export default {
    loginAction
  }