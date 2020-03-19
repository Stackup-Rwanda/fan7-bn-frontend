import React, { Component } from 'react';
import { connect } from 'react-redux';
import InputField from '../../components/InputField/index';
import Button from '../../components/Button';
import AuthLayout from '../../containers/AuthLayout';
import '../../containers/authLayout.scss';
import updatePassword from '../../store/modules/resetPassword/actions';


class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      password: '',
      confirmPassword: '',
      error:''
    };
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { password, confirmPassword } = this.state;
    const { editPassword } = this.props;
    await editPassword({
      password, confirmPassword,
    });
  }

  checkPasswordInput = (e) => {
    const validPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,64}$/;
    if (!validPasswordRegex.test(e.target.value)) {
      this.setState({
        passwordError: 'Should be alphanumeric and atleast 8 characters',
        isPasswordValid: false,
      });
    } else {
      this.setState({
        passwordError: '',
        isPasswordValid: true,
      });
    }
  }
  checkConfirmPasswordInput = (e) => {
    const validPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,64}$/;
    if (!validPasswordRegex.test(e.target.value)) {
      this.setState({
        confirmPasswordError: 'Should be alphanumeric and atleast 8 characters',
        isPasswordValid: false,
      });
    } else {
      this.setState({
        confirmPasswordError: '',
        isPasswordValid: true,
      });
    }
  }
  resetInput = (e) => {
    if (e.target.id === 'pass') {
      this.setState({ passwordError: '', isPasswordValid: false });
    }
    if (e.target.id === 'confirmPass') {
      this.setState({ confirmPasswordError: '', isPasswordValid: false });
    }
  }

  render() {
    const {passwordError, confirmPasswordError} = this.state;
    return (
      <AuthLayout title="Reset Password" redirectMsg="Already have an account?" redirectLocation=" Login" redirect={() => history.push('/login')}>
          <p className="paragraph">
            Please enter your new password or exit window and no action will be taken upon your credentials
          </p>
      <div className="form-box">
        <div>
        <form onSubmit={this.handleSubmit}>
        <div className="error">
            {passwordError}
          </div>
          <InputField
            type="password"
            placeholder="New password"
            name="password"
            id="pass"
            className="input"
            required
            error={this.state.error}
            onChange={this.handleChange}
            onKeyUp={this.checkPasswordInput}
            onFocus= {this.resetInput}
          />
          <div className="error">
            {confirmPasswordError}
          </div>
          <InputField
            type="password"
            placeholder="Confirm new password"
            name="confirmPassword"
            id="confirmPass"
            className="input"
            required
            error={this.state.error}
            onChange={this.handleChange}
            onKeyUp={this.checkConfirmPasswordInput}
            onFocus={this.resetInput}
          />
          <Button
            type="submit"
            value="Reset Password"
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
  password: state.password,
  confirmPassword: state.confirmPassword,
});

const mapDispatchToProps = (dispatch) => ({
  editPassword: (data) => dispatch(updatePassword(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
