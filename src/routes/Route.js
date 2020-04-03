/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import jwt from 'jwt-decode';
import AuthService from '../utils/AuthService';

function RouteWrapper({ component: Component, users, user, isPrivate, roleRequired, ...rest }) {
  const signedIn = users.isAuthenticated;
  const LoggedIn = user.isAuthenticated;
  const token = AuthService.getToken();
  const { role } = !!token ? jwt(token) : { role: '' };

  if (isPrivate && !(signedIn || LoggedIn)) {
    return <Redirect to="/" />;
  }

  if (!isPrivate && (signedIn || LoggedIn)) {
    return <Redirect to="/dashboard" />;
  }

  if (!!roleRequired && !roleRequired.includes(role.toLowerCase())) {
    return <Redirect to="/403" />;
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Route {...rest} component={Component} />;
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  roleRequired: PropTypes.string,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
  roleRequired: '',
};

const mapStateToProps = state => ({
  users: state.currentUser,
  user: state.user,
});

export default connect(mapStateToProps, null)(RouteWrapper);
