/* eslint-disable no-useless-escape */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuthLayout from '../../../containers/AuthLayout';
import '../../../containers/authLayout.scss';
import Input from '../../../components/InputField';
import Button from '../../../components/Button';
import { addUser } from '../../../store/modules/authentication/Signup/actions';
import history from '../../../utils/helpers/history';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checkEmailInput = this.checkEmailInput.bind(this);
    this.checkPasswordInput = this.checkPasswordInput.bind(this);
    this.checkUserNameInput = this.checkUserNameInput.bind(this);
    this.resetInput = this.resetInput.bind(this);
    this.state = {
      username: '',
      email: '',
      password: '',
      isLoading: false,
      error: '',
      emailError: '',
      passwordError: '',
      userNameError: '',
      isEmailValid: false,
      isPasswordValid: false,
      isUserNameValid: false,
    };
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  checkEmailInput(e) {
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
  }

  checkPasswordInput(e) {
    const validPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,64}$/;
    if (!validPasswordRegex.test(e.target.value)) {
      this.setState({
        passwordError: 'Should be alphanumeric and between  8 to 64 characters',
        isPasswordValid: false,
      });
    } else {
      this.setState({
        passwordError: '',
        isPasswordValid: true,
      });
    }
  }

  checkUserNameInput(e) {
    const validPasswordRegex = /^[a-zA-Z]{3,}/;
    if (!validPasswordRegex.test(e.target.value)) {
      this.setState({
        userNameError: 'Should be alphabetic and atleast 3 characters',
        isUserNameValid: false,
      });
    } else {
      this.setState({
        userNameError: '',
        isUserNameValid: true,
      });
    }
  }

  resetInput(e) {
    if (e.target.id === 'email') {
      this.setState({ emailError: '', isEmailValid: false });
    }
    if (e.target.id === 'password') {
      this.setState({ passwordError: '', isPasswordValid: false });
    }
    if (e.target.id === 'username') {
      this.setState({ userNameError: '', isUserNameValid: false });
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { email, password, username } = this.state;
    const { signupUser } = this.props;
    await signupUser({
      userName: username,
      email,
      password,
    });
  }

  render() {
    const {
      email, password, username, emailError, passwordError, userNameError,
    } = this.state;
    return (
      <AuthLayout title="Create an account" redirectMsg="already have an account? " redirectLocation=" Login" redirect={() => history.push('/login')}>
        <div className="form-box">
          <div>
            <form onSubmit={this.handleSubmit}>
              <div className="error">{userNameError}</div>
              <Input
                type="text"
                className="input"
                name="username"
                id="username"
                value={username}
                placeholder="Username"
                onChange={this.handleChange}
                onKeyUp={this.checkUserNameInput}
                onFocus={this.resetInput}
              />
              <div className="error">{emailError}</div>
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
                required
                placeholder="Password"
                className="input"
                value={password}
                onChange={this.handleChange}
                onKeyUp={this.checkPasswordInput}
                onFocus={this.resetInput}
              />
              <Button className="btn" type="submit" value="Sign up" />
            </form>
          </div>
        </div>
      </AuthLayout>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.signUpUser,
});
const mapDispatchToProps = (dispatch) => ({
  signupUser: (data) => dispatch(addUser(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
