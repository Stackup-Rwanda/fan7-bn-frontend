import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import moxios from 'moxios';
import { getUser, storeToken } from '../authHelper';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmYW50YXN0aWM3QGdtYWlsLmNvbSIsInJvbGUiOiJzdXBlci1hZG1pbmlzdHJhdG9yIiwiaWF0IjoxNTg1NTY5NDE3fQ.rjFabTZ3GD0vzwKyZi1UsvrFxuXjPneTs-tpat4pscY';

describe('Authentication Helper Tests suite', () => {

  it('should dispatch a get profile success action', () => {
    const store = mockStore({});
    const expected = [{"payload": {"email": "fantastic7@gmail.com", "iat": 1585569417, "id": 1, "role": "super-administrator"}, "type": "SUCCESS_LOGIN"}];

    store
      .dispatch(storeToken(token));
        expect(store.getActions()).toEqual(expected);
  });

  it('should dispatch a get profile success action', async (done) => {
    const mockData = {
      status: 200,
      message: 'User retrieved successfully',
      data: {
        image_url: 'herokuapp.com',
      },
    };

    moxios.stubRequest('https://barefoot-nomad-staging.herokuapp.com/api/profile', {
      status: 200,
      response: mockData.data,
    });
    const store = mockStore({});
    return await store
    .dispatch(getUser())
    .then(() => {
      const JWTDecoder = jest.fn(() => token);
      expect(JWTDecoder).toHaveBeenCalled();      
      expect(store.getActions()).toEqual(mockData.data);
    })
    .finally(done());
  });
});
