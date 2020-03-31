/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import qs from 'qs';
import { connect } from 'react-redux';
import { storeToken } from '../../utils/helpers/authHelper';

const ProtectedRoutes = ({ setUser, component: Component, ...rest }) => {
  const { token } = qs.parse(window.location.search, { ignoreQueryPrefix: true });
  if (token) {
    storeToken(token);
    setUser(token);
  }
  return (
    <Route
      {...rest}
      render={(props) => (
        localStorage.getItem('barefoot_nomad_token')
          ? <Component {...props} />
          : <Redirect to={{ pathname: '/login', state: { from: props.location } }} {...rest} />
      )}
    />
  );
};

ProtectedRoutes.propTypes = {
  component: PropTypes.any,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }),
  setUser: PropTypes.any,
};

ProtectedRoutes.defaultProps = {
  setUser: null,
  location: null,
  component: null,
};
export default connect(null, {
  setUser: storeToken,
})(ProtectedRoutes);
