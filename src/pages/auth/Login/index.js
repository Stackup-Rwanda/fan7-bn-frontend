import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Login.scss';
import Logo from '../../../components/logo/logo';
import Input from '../../../components/InputField';
import Button from '../../../components/Button';
import { loginAction } from '../../../store/modules/auth/actions';

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
  // componentDidUpdate() {
  //   const { user } = this.props;
  //   if(user.isAuthenticated === true) {
  //     const token = localStorage.getItem('token')
  //     if(token){
  //       window.location.href('/')
  //     }
  //   }
  // }

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
      <div className="loginBody">
        <div className="container">
          <div className="tab1">
            <Logo />
            <h6 className="title">Log in to continue</h6>
            <div className="error">{emailError}</div>
            <form className="loginForm">
              <Input
                type="text"
                name="email"
                id="email"
                placeholder="Email"
                className="input"
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
                className="input"
                value={password}
                onChange={this.handleChange}
                onKeyUp={this.checkPasswordInput}
                onFocus={this.resetInput}
              />
              <Button type="submit" className="btn" value="Login" onClick={this.handleLogin} />
            </form>
            <div className="links">
              <a href="/auth/forget">Forgot Password?</a>
            </div>
            <div className="bottom-link">
              <p href="#" className="link">
                You don't have an account?
                <a href="/auth/signup"> Sign up</a>
              </p>
            </div>
          </div>
          <div className="tab2">
            <div className="glass">
              <div className="travel__tab">
                <h1 className="travel-info-title">Travel The World</h1>
                <p className="travel-info">We make travel and accommodation</p>
                <p className="travel-info"> easy and convenient</p>
              </div>
            </div>
          </div>
        </div>
      </div>
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
