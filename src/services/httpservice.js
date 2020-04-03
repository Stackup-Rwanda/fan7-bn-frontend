import axios from 'axios';

export const heroku = 'http://localhost:5000/api';

export const axiosCall = axios.create({
  baseURL: heroku,
});

export default {
  get: axiosCall.get,
  post: axiosCall.post,
  patch: axiosCall.patch,
  delete: axiosCall.delete,
  axiosCall,
};
