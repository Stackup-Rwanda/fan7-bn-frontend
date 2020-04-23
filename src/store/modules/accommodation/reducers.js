import {
  GET_ALL_ACCOMMODATIONS_START,
  GET_ALL_ACCOMMODATIONS_SUCCESS,
  GET_ALL_ACCOMMODATIONS_ERROR,
  GET_SINGLE_ACCOMMODATION_START,
  GET_SINGLE_ACCOMMODATION_SUCCESS,
  GET_SINGLE_ACCOMMODATION_ERROR,
  FILTER_ACCOMMODATIONS,
} from './types';

const initialState = {
  acoommodations: [],
  accommodation: null,
  loading: false,
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_ACCOMMODATIONS_START:
      return { ...state, loading: true };

    case GET_ALL_ACCOMMODATIONS_SUCCESS:
      return { ...state, accommodations: payload, loading: false };

    case GET_ALL_ACCOMMODATIONS_ERROR:
      return { ...state, error: payload, loading: false };

    case FILTER_ACCOMMODATIONS:
      return {
        ...state,
        accommodations: payload,
        loading: false,
      };

    case GET_SINGLE_ACCOMMODATION_START:
      return { ...state, loading: true };

    case GET_SINGLE_ACCOMMODATION_SUCCESS:
      return { ...state, accommodation: payload, loading: false };

    case GET_SINGLE_ACCOMMODATION_ERROR:
      return { ...state, error: payload, loading: false };

    default:
      return state;
  }
};
