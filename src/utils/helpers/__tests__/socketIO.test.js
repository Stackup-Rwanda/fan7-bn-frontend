import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import socketClient from 'socket.io-client';
import socketIO from '../socketIO';
import io, { serverSocket, cleanUp, socket } from '../__mocks__/socketIOMock';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const showNotification = jest.fn();

jest.mock('socket.io-client');

socketClient.mockImplementation(() => socket);

describe('Socket IO Test', () => {
  beforeEach(() => {
    const store = mockStore({});
    socketIO(store);
  });

  afterEach(() => {
    cleanUp();
  });

//   it('should listen on connect event', () => {
//     serverSocket.emit('connect');
//     // expect(showNotification).toHaveBeenCalled();
//   });

  it('should listen on created_request event', () => {
    serverSocket.emit('created_request', {
      id: 8,
      message: 'New request has been created, waiting for approval',
      request_id: 11,
      status: 'unread',
      type: 'Created',
    });
    // expect(showNotification).toHaveBeenCalled();
  });

  it('should listen on edited_request event', () => {
    serverSocket.emit('edited_request', {
      id: 8,
      message: 'Request has been edited',
      request_id: 11,
      status: 'unread',
      type: 'Updated',
    });
  });

  it('should listen on approved_request event', () => {
    serverSocket.emit('approved_request', {
      id: 8,
      message: 'Request has been approved',
      request_id: 11,
      status: 'unread',
      type: 'Approved',
    });
  });

  it('should listen on rejected_request event', () => {
    serverSocket.emit('rejected_request', {
      id: 8,
      message: 'Request has been rejected',
      request_id: 11,
      status: 'unread',
      type: 'Rejected',
    });
  });

  it('should listen on commented_request event', () => {
    serverSocket.emit('commented_request', {
      id: 8,
      message: 'Request has been commented on',
      request_id: 11,
      status: 'unread',
      type: 'Commented',
    });
  });
});
