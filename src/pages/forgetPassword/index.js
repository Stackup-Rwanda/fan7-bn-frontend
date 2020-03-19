import React, { Component } from 'react';
import { connect } from 'react-redux';
import InputField from '../../components/InputField/index';
import Button from '../../components/Button/index';
import AuthLayout from '../../containers/AuthLayout';
import '../../containers/authLayout.scss';
// import  './forgetPassword.scss';
// import Logo from '../../components/logo/logo';
import sendEmail from '../../store/modules/forgetPassword/actions';

class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      email: '',
      error: '',
    };
  }

  handleChange(event) {
    const { value } = event.target;
    this.setState({
      email: value,
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { email } = this.state;
    const { forgetEmail } = this.props;
    await forgetEmail({
      email,
    });
  }

  checkEmailInput = (e) => {
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

  resetInput = (e) => {
    if (e.target.id === 'email') {
      this.setState({ emailError: '', isEmailValid: false });
    }
  }

  render() {
    const {
       emailError,
    } = this.state;
    return (
      <AuthLayout title="Reset Password" redirectMsg="Already have an account?" redirectLocation=" Login" redirect={() => history.push('/login')}>
          <p className="paragraph">
            Enter your email, we will contact you shortly for reset password.
          </p>
        <div className="form-box">
          <div>
          <form onSubmit={this.handleSubmit}>
          <div className="error">
            {emailError}
          </div>
            <InputField
              type="text"
              name="Email"
              id="email"
              placeholder="Email"
              className="input"
              required
              error={this.state.error}
              onChange={this.handleChange}
              onKeyUp={this.checkEmailInput}
              onFocus={this.resetInput}
            />
            <Button
              type="submit"
              value="Request reset"
              className="btn"
            />
          </form>
          </div>
        </div>
 </AuthLayout>
    );
  }
}
const mapStateToProps = (state) => ({
  email: state.email,
});
const mapDispatchToProps = (dispatch) => ({
  forgetEmail: (data) => dispatch(sendEmail(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword);
