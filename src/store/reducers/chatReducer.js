import { GET_CHAT_MESSAGES, SAVE_CHAT_MESSAGE } from '../actions/types';

const initialState = {
  messages: [],
  newMessage: null,
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CHAT_MESSAGES:
      return {
        ...state,
        messages: payload,
      };
    case SAVE_CHAT_MESSAGE:
      return {
        ...state,
        newMessage: payload,
      };
    default:
      return state;
  }
};
