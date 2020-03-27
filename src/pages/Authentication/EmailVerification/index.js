/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { confirmUser } from '../../../store/modules/auth/VerifyEmailActions';

class EmailConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    this.confirmUser();
  }

  componentDidUpdate() {
  }

  async confirmUser() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const token = urlParams.get('token');
    const { confirmUserAccount } = this.props;
    await confirmUserAccount(token);
  }

  render() {
    if (this.props.user.user && this.props.user.user.email) {
      return <Redirect to="/dashboard" />;
    }
    if (this.props.user.error && this.props.user.error.status) {
      return <div>{this.props.user.error.error}</div>;
    }
    return (<div />);
  }
}


const mapStateToProps = (state) => ({
  user: state.currentUser,
});
const mapDispatchToProps = (dispatch) => ({
  confirmUserAccount: (data) => dispatch(confirmUser(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailConfirm);
