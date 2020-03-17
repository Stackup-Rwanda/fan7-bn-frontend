import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Login.scss';
import Logo from '../../components/logo/logo';
import Input from '../../components/InputField';
import Button from '../../components/Button';
import { loginAction } from '../../store/modules/auth/actions';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }
  handleLogin = (event) => {
    event.preventDefault();
    this.props.userFetch(this.state);
  }
  render() {
    const { email, password } = this.state;
    return (
      <div className="container">
        <div className="tab1">
          <Logo />

          <h6 className="title">Log in to continue</h6>
          <form>
            <Input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              className="input"
              value={email}
              onChange={this.handleChange}
            />
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="input"
              value={password}
              onChange={this.handleChange}
            />
            <Button
              type="submit"
              className="btn"
              value="Login"
              onClick={this.handleLogin}
            />
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
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userFetch: data => { dispatch(loginAction(data)) }
  }
}

export default connect(null, mapDispatchToProps)(Login);