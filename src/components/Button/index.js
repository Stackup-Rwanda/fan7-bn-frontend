import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({
  className,
  isloading,
  value,
  onClick,
}) => (
  <div className="row">
    <button
      className={className}
      type="submit"
      isloading={isloading}
      onClick={onClick}
    >
      {value}
    </button>
  </div>

);

Button.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]).isRequired,
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
