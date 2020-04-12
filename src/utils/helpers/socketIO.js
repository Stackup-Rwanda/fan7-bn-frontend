import socketClient from 'socket.io-client';
import jwtDecode from 'jwt-decode';
import AuthService from '../AuthService';
import { toast } from 'react-toastify';
import { getNotifications } from '../../store/modules/notification/actions';

const socketIO = (store) => {
  const token = AuthService.getToken();
  const { id } = !!token ? jwtDecode(token) : { id: null };
  const connectionOptions = {
    'force new connection': true,
    reconnectionAttempts: 'Infinity',
    timeout: 10000,
  };
  const socket = socketClient('https://barefoot-nomad-staging.herokuapp.com/', connectionOptions);

  const showNotification = (data) => {
    store.dispatch(getNotifications());
    toast.info(data.message, {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: true,
    });
  };

  socket.on('connect', () => {
    socket.emit('join notification', { id: `notification_${id}` });
  });

  socket.on('created_request', (data) => {
    showNotification(data);
  });

  socket.on('edited_request', (data) => {
    showNotification(data);
  });

  socket.on('approved_request', (data) => {
    showNotification(data);
  });

  socket.on('rejected_request', (data) => {
    showNotification(data);
  });

  socket.on('commented_request', (data) => {
    showNotification(data);
  });
};

export default socketIO;
