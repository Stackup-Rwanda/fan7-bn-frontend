import socketIo from 'socket.io-client';
import HttpService from '../HttpService';
import actionFormat from './actionFormat';
import { GET_CHAT_MESSAGES, SAVE_CHAT_MESSAGE } from '../../store/actions/types';
import JwtDecode from 'jwt-decode';

export const socket =  socketIo('https://barefoot-nomad-staging.herokuapp.com');

export const connectUser = (token) => {
  socket.on('private room', data => {});
  return JwtDecode(token);
}

export const getChatMessages = () => async (dispatch) => {
  const res = await HttpService.get('/chat/get');
  dispatch(actionFormat(GET_CHAT_MESSAGES, res.data));
}

export const saveChatMessage = (data) => async (dispatch) => {
  socket.emit('chat', {
    senderId: data.id,
    sender: data.sender,
    message: data.message,
  });
  dispatch(actionFormat(SAVE_CHAT_MESSAGE, data));
  await HttpService.post('/chat/post', data);
}
