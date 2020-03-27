import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../../../containers/authLayout.scss';
import Input from '../../../components/InputField';
import Button from '../../../components/Button';
import { loginAction } from '../../../store/modules/auth/loginActions';
import AuthLayout from '../../../containers/AuthLayout';
import history from '../../../utils/helpers/history';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
      isEmailValid: false,
      isPasswordValid: false,
    };
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  checkEmailInput = e => {
    const validEmailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!validEmailRegex.test(e.target.value)) {
      this.setState({
        emailError: 'Email is invalid',
        isEmailValid: false,
      });
    } else {
      this.setState({
        emailError: '',
        isEmailValid: true,
      });
    }
  };

  checkPasswordInput = e => {
    const validPasswordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]){3}/;
    if (!validPasswordRegex.test(e.target.value)) {
      this.setState({
        passwordError: 'Should be alphanumeric and atleast 3 characters',
        isPasswordValid: false,
      });
    } else {
      this.setState({
        passwordError: '',
        isPasswordValid: true,
      });
    }
  };

  resetInput = e => {
    if (e.target.id === 'email') {
      this.setState({ emailError: '', isEmailValid: false });
    }
    if (e.target.id === 'password') {
      this.setState({ passwordError: '', isPasswordValid: false });
    }
  };

  handleLogin = async event => {
    const { email, password } = this.state;
    const { userFetch } = this.props;
    event.preventDefault();
    const payload = { email, password };
    await userFetch(payload);
  };

  render() {
    const { email, password, emailError, passwordError } = this.state;
    return (
      <AuthLayout
        title="Login into your account"
        redirectMsg="don't have an account? "
        redirectLocation=" Signup"
        redirect={() => history.push('/signup')}
      >
        <div className="form-box">
          <div>
            <form className="loginForm">
              <Input
                type="text"
                name="email"
                id="email"
                placeholder="Email"
                className="input auth_input"
                value={email}
                onChange={this.handleChange}
                onKeyUp={this.checkEmailInput}
                onFocus={this.resetInput}
              />
              <div className="error">{passwordError}</div>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="input auth_input"
                value={password}
                onChange={this.handleChange}
                onKeyUp={this.checkPasswordInput}
                onFocus={this.resetInput}
              />
              <Button
                type="submit"
                className="btn"
                value="Login"
                onClick={this.handleLogin}
              />
            </form>
            <div className="links">
              <a href="/forgetPassword">Forgot Password?</a>
            </div>
          </div>
        </div>
      </AuthLayout>
    );
  }
}

Login.PropTypes = {
  loginAction: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  userFetch: data => {
    dispatch(loginAction(data));
  },
});

export default connect(mapStateProps, mapDispatchToProps)(Login);
