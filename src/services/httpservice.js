/* eslint-disable consistent-return */
import axios from 'axios';

export const heroku = 'http://www.barefoot-nomad-staging.heroku.com/api';

const apiCall = axios.create({
  baseURL: heroku,
});

const setToken = (token) => {
  if (!token) {
    return delete apiCall.defaults.headers.common.Authorization;
  }
  apiCall.defaults.headers.common.Authorization = `Bearer ${token}`;
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
  get: apiCall.get,
  post: apiCall.post,
  patch: apiCall.patch,
  delete: apiCall.delete,
  apiCall,
  setToken,
};
console.log(apiCall);
