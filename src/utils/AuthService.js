export default class AuthService {
  static setToken(token) {
    localStorage.setItem('barefoot_nomad_token', token);
  }

  static getToken() {
    return localStorage.getItem('barefoot_nomad_token');
  }

  static isLoggedIn() {
    return !!localStorage.getItem('barefoot_nomad_token');
  }

  static logout() {
    localStorage.removeItem('barefoot_nomad_token');
  }
}
