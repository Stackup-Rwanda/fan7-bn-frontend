import axios from 'axios';

export default axios.create({
  baseURL: 'https://barefoot-nomad-staging.herokuapp.com/',
  responseType: 'json',
});
