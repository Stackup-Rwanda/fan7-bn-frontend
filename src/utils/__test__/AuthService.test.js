import AuthService from '../AuthService';
import localStorageMock from '../__mocks__/localStorageMock';

window.localStorage = localStorageMock;

describe('localStorage', () => {
  beforeEach(() => localStorage.clear());

  it("returns null if requested token doesn't exist", () => {
    const token = AuthService.getToken();;
    expect(token).toBeNull();
  });

  it('sets the value of a token', () => {
    AuthService.setToken('token');
    expect(localStorage.getItem('barefoot_nomad_token')).toEqual('token');
  });

  it('should return true if logged in', () => {
    localStorage.setItem('barefoot_nomad_token', 'token');
    expect(AuthService.isLoggedIn()).toBe(true);
  });

});
