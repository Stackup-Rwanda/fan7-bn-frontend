import AuthService from '../AuthService';

jest.mock('../AuthService');

describe('AuthService util tests', () => {
  const token = 'token';

  it('should handle set token', () => {
    AuthService.setToken(token);

    expect(AuthService.setToken).toHaveBeenCalled();
  });

  it('should handle get token', () => {
    AuthService.getToken();

    expect(AuthService.getToken).toHaveBeenCalled();
  });

  it('should handle isLoggedIn', () => {
    AuthService.isLoggedIn();

    expect(AuthService.isLoggedIn).toHaveBeenCalled();
  });

  it('should handle remove token', () => {
    AuthService.logout();

    expect(AuthService.logout).toHaveBeenCalled();
  });
});
