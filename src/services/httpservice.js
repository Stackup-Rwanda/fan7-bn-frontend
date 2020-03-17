/* eslint-disable consistent-return */
import axios from 'axios';

export const heroku = 'https://barefoot-nomad-staging.herokuapp.com/api';

export const axiosCall = axios.create({
  baseURL: heroku,
});

const setToken = (token) => {
  if (!token) {
    return delete axiosCall.defaults.headers.common.Authorization;
  }
  axiosCall.defaults.headers.common.Authorization = `Bearer ${token}`;
};
setToken(localStorage.getItem('secret'));


//  const saveTolocalStorage = (user) => {
//   if(user)
//   const token =   user.token || localStorage.getItem('secret');
//   localStorage.setItem('secret', token);
//   localStorage.setItem('user', JSON.stringify(user));
//   token ? localStorage.setItem('isAuthenticated', true): '';
// }

export default {
  get: axiosCall.get,
  post: axiosCall.post,
  patch: axiosCall.patch,
  delete: axiosCall.delete,
  axiosCall,
  setToken,
};
console.log(axiosCall);
