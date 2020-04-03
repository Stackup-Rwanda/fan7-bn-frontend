import axios from 'axios';
import AuthService from './AuthService';

const token = AuthService.getToken();

export const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
  responseType: 'json',
  headers: {
    token: `Bearer ${token}`,
  },
});

instance.CancelToken = axios.CancelToken;
instance.isCancel = axios.isCancel;
instance.Cancel = axios.Cancel;

const onSuccess = response => {
  console.debug('Request Successful!', response);
  return response.data;
};

const onError = error => {
  console.error('Request Failed:', error.config);
  return Promise.reject(error);
};

const request = options =>
  instance(options)
    .then(onSuccess)
    .catch(onError);

export default request;
