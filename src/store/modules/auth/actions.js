import history from '../../../utils/helpers/history';
import { LOGIN_SUCCESS, LOGIN_FAILURE } from './actionTypes';
import httpService from '../../../services/httpservice';

const { axiosCall, http } = httpService;
export const successLogin = (user) => ({
    type: LOGIN_SUCCESS,
    payload: user
  });
  
  export const loginError = (error) => ({
    type: LOGIN_FAILURE,
    payload: {
      error,
      isLoading: false,
      isAuthenticated: false,
    },
  });
  
  export const loginAction = (data) => {    
      const response = axiosCall.post('/auth/login', data)
      .then((response) => {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user_data', response.data)
        history.push('/dashboard');
        window.location.assign('/dashboard');
      }, (error) => {
        console.log('Invalid credentials',error);
      });
  };

  export default {
    loginAction
  }