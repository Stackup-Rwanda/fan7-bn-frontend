import axios from 'axios';
import AuthService from './AuthService';

const token = AuthService.getToken();

const instance = axios.create({
  baseURL: 'https://barefoot-nomad-staging.herokuapp.com/api',
  responseType: 'json',
  headers: {
    token: `Bearer ${token}`,
  }
});

// instance.defaults.headers.common.token = `Bearer ${token}`;

const onSuccess = (response) => {
  console.debug('Request Successful!', response);
  return response.data;
};

const onError = (error) => {
  console.error('Request Failed:', error.config);
  return Promise.reject(error);
};

const request = (options) => instance(options)
  .then(onSuccess)
  .catch(onError);

export default request;
