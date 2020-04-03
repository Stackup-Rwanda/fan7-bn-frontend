import React from 'react';
import PropTypes from 'prop-types';
import './InputField.scss';

const InputField = ({
  type,
  name,
  id,
  value,
  defaultValue,
  placeholder,
  className,
  disabled,
  pattern,
  min,
  max,
  onChange,
  required,
  error,
  onKeyUp,
  onFocus
}) => (
  <div className="">
    <div className="form_group">
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={className}
        disabled={disabled}
        pattern={pattern}
        min={min}
        max={max}
        onChange={onChange}
        required={required}
        onKeyUp={onKeyUp}
        onFocus={onFocus}
      />
      <span className="invalid_input">{error}</span>
    </div>
  </div>
);

InputField.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  min: PropTypes.string,
  max: PropTypes.string,
  pattern: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  error: PropTypes.string,
  onKeyUp: PropTypes.func,
  onFocus: PropTypes.func,
};

InputField.defaultProps = {
  type: 'text',
  value: null,
  defaultValue: null,
  id: null,
  placeholder: null,
  className: null,
  min: null,
  max: null,
  onChange: null,
  required: false,
  pattern: null,
  disabled: null,
  error: null,
  onKeyUp: null,
  onFocus: null,
};

export default InputField;
