import {
  GET_TRIP_REQUEST_START,
  GET_TRIP_REQUEST_SUCCESS,
  GET_TRIP_REQUEST_ERROR,
  APPROVE_REJECT_SUCCESS,
  APPROVE_REJECT_ERROR,
  TRIPS_STATS_SUCCESS
  // HANDLE_PAGE_CHANGE,
  // HANDLE_ROWS_PER_PAGE_CHANGE,
} from './types';

const initialState = {
  loading: false,
  count: 0,
  requests: [],
  trips: [],
  // numberOfRows: 5,
  // page: 1,
  error: '',
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_TRIP_REQUEST_START:
      return {
        ...state,
        loading: true,
      };

    case GET_TRIP_REQUEST_SUCCESS:
      return {
        ...state,
        count: payload.count,
        requests: payload.rows,
        loading: false,
      };

    case GET_TRIP_REQUEST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case APPROVE_REJECT_SUCCESS: 
    return {
      ...state,
      status: payload.data,
      loading: false
    }
    case APPROVE_REJECT_ERROR: 
    return {
      ...state,
      error: payload,
      loading: false
    }
    case TRIPS_STATS_SUCCESS:
      return { 
        ...state,
         trips: action.payload,
         };
    // case HANDLE_ROWS_PER_PAGE_CHANGE:
    //   return {
    //     ...state,
    //     numberOfRows: payload.numberOfRows,
    //     page: payload.page,
    //   };

    // case HANDLE_PAGE_CHANGE:
    //   return {
    //     ...state,
    //     page: payload,
    //   };

    default:
      return state;
  }
};
