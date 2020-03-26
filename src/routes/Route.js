/* eslint-disable react/prop-types */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function RouteWrapper({
  component: Component,
  users,
  user,
  isPrivate,
  ...rest
}) {
  const signedIn = users.isAuthenticated;
  const LoggedIn = user.isAuthenticated;

  if (isPrivate && !(signedIn || LoggedIn)) {
    return <Redirect to="/login" />;
  }

  if (!isPrivate && (signedIn || LoggedIn)) {
    return <Redirect to="/dashboard" />;
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Route {...rest} component={Component} />;
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};


const mapStateToProps = (state) => ({
  users: state.currentUser,
  user: state.user,
});

export default connect(mapStateToProps, null)(RouteWrapper);
