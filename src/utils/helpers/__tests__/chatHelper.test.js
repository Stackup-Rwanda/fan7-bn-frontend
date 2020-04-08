import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import moxios from 'moxios';
import { GET_CHAT_MESSAGES, SAVE_CHAT_MESSAGE } from '../../../store/actions/types';
import actionFormat from '../actionFormat';
import { getChatMessages, saveChatMessage, connectUser } from '../chatHelper';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmYW50YXN0aWM3QGdtYWlsLmNvbSIsInJvbGUiOiJzdXBlci1hZG1pbmlzdHJhdG9yIiwiaWF0IjoxNTg1NTY5NDE3fQ.rjFabTZ3GD0vzwKyZi1UsvrFxuXjPneTs-tpat4pscY';

describe('Chat Helper Test suite', () => {

  it('should receive messages', () => {
    connectUser(token);
    const store = mockStore({});
    const expected = {
      senderId: 1,
      sender: 'Great',
      message: 'Test react',
    }
    store.dispatch(actionFormat(GET_CHAT_MESSAGES, expected));
      expect(store.getActions()).toEqual([{
        payload: expected,
        type: GET_CHAT_MESSAGES
      }]);
  });

  it('should send a message', () => {
    const store = mockStore({});
    const expected = {
      senderId: 1,
      sender: 'Great',
      message: 'Test react',
    }
    store.dispatch(actionFormat(SAVE_CHAT_MESSAGE, expected));
      expect(store.getActions()).toEqual([{
        payload: expected,
        type: SAVE_CHAT_MESSAGE
      }]);
  });

  it('should get messages stored in db', (done) => {
    const store = mockStore({});
    const expected = {
      senderId: 1,
      sender: 'Great',
      message: 'Test react',
    }

    moxios.stubRequest('https://barefoot-nomad-staging.herokuapp.com/api/chat/get', {
      status: 200,
      response: expected,
    });

    store
      .dispatch(getChatMessages())
      .then(() => {        
        expect(store.getActions()).toEqual([expected]);
      })
      .finally(done());
  });
  it('should save message in db', (done) => {
    const store = mockStore({});
    const expected = {
      senderId: 1,
      sender: 'Great',
      message: 'Test react',
    }

    moxios.stubRequest('https://barefoot-nomad-staging.herokuapp.com/api/chat/post', {
      status: 200,
      response: expected,
    });

    store
      .dispatch(saveChatMessage(expected))
      .then(() => {
        expect(store.getActions()).toEqual([expected]);
      })
      .finally(done());
  });


});
