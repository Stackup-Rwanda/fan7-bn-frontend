import JWTDecoder from 'jwt-decode';
import actionFormat from './actionFormat';
import { SUCCESS_LOGIN } from '../../store/actions/types';

export const storeToken = (token) => (dispatch) => {
  const userData = JWTDecoder(token);
  localStorage.setItem('barefoot_nomad_token', token);
  dispatch(actionFormat(SUCCESS_LOGIN, userData));
};
