import {
  GET_USERS_START,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  CHANGE_USER_ROLE_START,
  CHANGE_USER_ROLE_SUCCESS,
  CHANGE_USER_ROLE_FAILURE,
} from './actionTypes';

const initialState = {
  users: [],
  loading: false,
  error: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_START:
      return {
        ...state,
        loading: true,
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.users,
        loading: false,
      };
    case GET_USERS_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case CHANGE_USER_ROLE_START:
      return {
        ...state,
        loading: true,
      };
    case CHANGE_USER_ROLE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case CHANGE_USER_ROLE_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    default:
      return state;
  }
};
