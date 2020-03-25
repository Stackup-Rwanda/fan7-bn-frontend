import JWTDecoder from 'jwt-decode';
import actionFormat from './actionFormat';
import { SUCCESS_LOGIN, SUCCESS_GET_USER, SUCCESS_GET_REQUESTS } from '../../store/actions/types';
import HttpService from '../HttpService';
import AuthService from '../AuthService';

export const storeToken = (token) => (dispatch) => {
  const userData = JWTDecoder(token);
  AuthService.setToken(token);
  dispatch(actionFormat(SUCCESS_LOGIN, userData));
};

export const getUser = () => async (dispatch) => {
  const res = await HttpService.get('/profile');
  const token = AuthService.getToken();
  const userData = JWTDecoder(token);
  const image = userData.image !== undefined ? userData.image : res.data.image_url;
  dispatch(actionFormat(SUCCESS_GET_USER, image));
}

export const getRequests = (page, limit) => async (dispatch) => {
  const res = await HttpService.get(`/requests?page=${page}&numberOfRows=${limit}`);
  dispatch(actionFormat(SUCCESS_GET_REQUESTS, res.data));
}