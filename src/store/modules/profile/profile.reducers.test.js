import reducer from './reducers';
import {
  GET_PROFILE_START,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_ERROR,
  UPDATE_PROFILE_START,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_ERROR,
  GET_TRIPS_SUCCESS,
} from './actionTypes';

describe('Reducers test', () => {
  it('should return the initial state', () => {
    const expectedAction = {
      error: null,
      loading: false,
      loadingUpdateProfile: false,
      profile: null,
      trips: [],
    };

    expect(reducer(undefined, {})).toEqual(expectedAction);
  });

  it('should handle GET_PROFILE_START', () => {
    const action = {
      type: GET_PROFILE_START,
    };
    const expectedAction = {
      loading: true,
    };

    expect(reducer({}, action)).toEqual(expectedAction);
  });

  it('should handle GET_PROFILE_SUCCESS', () => {
    const action = {
      type: GET_PROFILE_SUCCESS,
      payload: { email: 'elvisrugamba@gmail.com' },
    };
    const expectedAction = {
      loading: false,
      profile: { email: 'elvisrugamba@gmail.com' },
    };

    expect(reducer({}, action)).toEqual(expectedAction);
  });

  it('should handle GET_TRIPS_SUCCESS', () => {
    const action = {
      type: GET_TRIPS_SUCCESS,
      payload: [{ destination: 'Nigeria, Lagos' }],
    };
    const expectedAction = {
      loading: false,
      trips: [{ destination: 'Nigeria, Lagos' }],
    };

    expect(reducer({}, action)).toEqual(expectedAction);
  });

  it('should handle GET_PROFILE_ERROR', () => {
    const action = {
      type: GET_PROFILE_ERROR,
      payload: { status: 400, error: 'Bad request' },
    };
    const expectedAction = {
      loading: false,
      error: { status: 400, error: 'Bad request' },
    };

    expect(reducer({}, action)).toEqual(expectedAction);
  });

  it('should handle null GET_PROFILE_ERROR', () => {
    const action = {
      type: GET_PROFILE_ERROR,
    };
    const expectedAction = {
      loading: false,
      error: null,
    };

    expect(reducer({}, action)).toEqual(expectedAction);
  });

  it('should handle UPDATE_PROFILE_START', () => {
    const action = {
      type: UPDATE_PROFILE_START,
    };
    const expectedAction = {
      loadingUpdateProfile: true,
    };

    expect(reducer({}, action)).toEqual(expectedAction);
  });

  it('should handle UPDATE_PROFILE_SUCCESS', () => {
    const action = {
      type: UPDATE_PROFILE_SUCCESS,
      payload: { email: 'elvis@gmail.com' },
    };
    const expectedAction = {
      loadingUpdateProfile: false,
      profile: { email: 'elvis@gmail.com' },
    };

    expect(reducer({}, action)).toEqual(expectedAction);
  });

  it('should handle UPDATE_PROFILE_ERROR', () => {
    const action = {
      type: UPDATE_PROFILE_ERROR,
      payload: { status: 422, error: 'Invalid email address' },
    };
    const expectedAction = {
      loadingUpdateProfile: false,
      error: { status: 422, error: 'Invalid email address' },
    };

    expect(reducer({}, action)).toEqual(expectedAction);
  });

  it('should handle null UPDATE_PROFILE_ERROR', () => {
    const action = {
      type: UPDATE_PROFILE_ERROR,
    };
    const expectedAction = {
      loadingUpdateProfile: false,
      error: null,
    };

    expect(reducer({}, action)).toEqual(expectedAction);
  });
});
