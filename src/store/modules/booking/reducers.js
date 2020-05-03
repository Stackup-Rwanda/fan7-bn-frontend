import {
  BOOKING_START,
  BOOKING_SUCCESS,
  BOOKING_ERROR,
} from './types';

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case BOOKING_START:
      return { ...state, loading: true };

    case BOOKING_SUCCESS:
      return { ...state, data: payload, loading: false };

    case BOOKING_ERROR:
      return { ...state, error: payload, loading: false };

    default:
      return state;
  }
};
