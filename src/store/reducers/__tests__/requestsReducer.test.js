import requestsReducer from '../requestsReducer';
import { SUCCESS_GET_REQUESTS } from '../../actions/types';

describe('Requests Reducer Tests', () => {
  it('Should Get Requests', () => {
    const success = {
      type: SUCCESS_GET_REQUESTS,
      payload: {
        id: 1,
        name: 'Mistico',
      },
    };
    const newState = requestsReducer(undefined, success);
    expect(newState).toEqual({
      requests: success.payload,
      message: 'Success retreived',
      error: null,
    });
  });
  it('Should return default state', () => {
    const defaultState = {
      type: 'DEFAULT',
      payload: 'none',
    };
    const newState = requestsReducer(undefined, defaultState);
    expect(newState).toEqual({
      requests: [],
      message: null,
      error: null,
    });
  });
});
