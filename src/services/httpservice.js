import axios from 'axios';

export const heroku = 'https://barefoot-nomad-staging.herokuapp.com/api';

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
