import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  className,
  isloading,
  value,
  onClick,
}) => (
  <button
    className={className}
    type="submit"
    isloading={isloading}
    onClick={onClick}
  >
    {value}
  </button>
);

Button.propTypes = {
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
  isloading: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  className: null,
  onClick: null,
  isloading: null,
};

export default Button;
