import { apiStart, apiSuccess, apiError } from './actions';
import { SIGN_UP_START, SIGN_UP_SUCCESS, SIGN_UP_ERROR } from './actionTypes';

describe('signup actions tests', () => {
  it('It should call register action', () => {
    expect(apiStart()).toStrictEqual({
      type: SIGN_UP_START,
    });
  });
  it('Should call the action on success', () => {
    const payload = {
      value: 'value',
    };
    expect(apiSuccess(payload)).toStrictEqual({
      type: SIGN_UP_SUCCESS,
      payload,
    });
  });
  it('Should call the action register failure', () => {
    const error = {
      value: 'value',
    };
    expect(apiError(error)).toStrictEqual({
      type: SIGN_UP_ERROR,
      error,
    });
  });
  it('Should call the action register', () => {
    const error = {
      value: 'value',
    };
    expect(apiError(error)).toStrictEqual({
      type: SIGN_UP_ERROR,
      error,
    });
  });
});
