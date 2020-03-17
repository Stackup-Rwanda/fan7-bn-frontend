import React, { Component } from 'react';
import { connect } from 'react-redux';
import Joi from 'joi-browser';
import './Login.scss';
import Input from '../../components/InputField';
import Button from '../../components/Button';
import TravelBar from '../../components/TravelBar';
import logo from '../../assets/images/logo.png';
import { loginAction } from '../../store/modules/auth/actions';


const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errors: {
        email: '',
        password: ''
      }
    };
  }
  
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    let errors = this.state.errors;

    switch (name) {
      case 'email':
        errors.email =
        validEmailRegex.test(value)
        ? '': 'Email should be valid';
        break;
        case 'password':
          errors.password = value.length < 1
          ? 'Password should peovided': ''
          break;
      default:
        break;
    }

    this.setState({ errors, [name]: value })
  }


  handleLogin = (event) => {
    event.preventDefault();
    if(validateForm(this.state.errors)){
      this.props.userFetch(this.state);
    }
    else {
      console.log('Invalid form inputs')
    }
  }
  render() {
    const { email, password, errors } = this.state;
    return (
      <div className="container">
        <div className="card">
            <div className="card tab1">
                  <div className="logo">
                    <img src={logo} alt="logo" />
                  </div>
                  <h2 className="mb-1 text-center heading">
                    <span>Barefoot </span>
                    Nomad
                  </h2>
                  <h6 className="title">Log in to continue</h6>
                  <form>
                    <Input
                      type="text"
                      name="email"
                      id="email"
                      placeholder="email"
                      className="form-control"
                      value={email}
                      onChange={this.handleChange}
                      error= {errors.email}
                    />
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      className="form-control"
                      value={password}
                      onChange={this.handleChange}
                      required
                      error={errors.password}
                    />
                    <Button 
                      type="submit"
                      className="btn"
                      value="Login"
                      onClick={this.handleLogin}
                    />
                  </form>
                  <div className="row justify-content-center my-2">
                    <a href="/auth/forget">Forgot Password?</a>
                  </div>
                </div>
              <div className="no-account text-center mb-5">
                <p href="#" className="account-text mx-auto mb-3">
                  Don't have an account?
                  <a href="/auth/signup"> Sign up</a>
                </p>
              </div>
            {/* <TravelBar /> */}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
    userFetch: data => {dispatch(loginAction(data))}
})

export default connect(null, mapDispatchToProps)(Login);