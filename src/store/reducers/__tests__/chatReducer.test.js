import socialReducer from '../chatReducer';
import { GET_CHAT_MESSAGES, SAVE_CHAT_MESSAGE } from '../../actions/types';

describe('Chat Reducer Tests', () => {
  it('Should SAVE sent Message', () => {
    const saveMsg = {
      type: SAVE_CHAT_MESSAGE,
      payload: {
        id: 1,
        name: 'Mistico',
      },
    };
    const state = socialReducer(undefined, saveMsg);
    expect(state).toEqual({
      messages: [],
      newMessage: saveMsg.payload,
      error: null,
    });
  });
  it('Should GET old saved Messages', () => {
    const getMsgs = {
      type: GET_CHAT_MESSAGES,
      payload: [{
        senderId: 1,
        sender: 'Mistico',
        message: 'Chat Tests'
      }],
    };
    const newState = socialReducer(undefined, getMsgs);
    expect(newState).toEqual({
      messages: getMsgs.payload,
      newMessage: null,
      error: null,
    });
  });
  it('Should return default state', () => {
    const defaultState = {
      type: 'DEFAULT',
      payload: 'none',
    };
    const newState = socialReducer(undefined, defaultState);
    expect(newState).toEqual({
      messages: [],
      newMessage: null,
      error: null,
    });
  });
});
