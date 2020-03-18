import {
  GET_PROFILE_START,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_ERROR,
  UPDATE_PROFILE_START,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_ERROR,
  GET_TRIPS_SUCCESS,
} from './actionTypes';

const initialState = {
  profile: null,
  trips: [],
  loadingUpdateProfile: false,
  loading: false,
  error: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PROFILE_START:
      return {
        ...state,
        loading: true,
      };

    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: payload,
      };

    case GET_TRIPS_SUCCESS:
      return {
        ...state,
        loading: false,
        trips: payload,
      };

    case GET_PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        error: payload || null,
      };

    case UPDATE_PROFILE_START:
      return {
        ...state,
        loadingUpdateProfile: true,
      };

    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loadingUpdateProfile: false,
        profile: payload,
      };

    case UPDATE_PROFILE_ERROR:
      return {
        ...state,
        loadingUpdateProfile: false,
        error: payload || null,
      };

    default:
      return state;
  }
};
