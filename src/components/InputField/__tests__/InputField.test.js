/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { shallow } from 'enzyme';
import InputField from '../index';

describe('Input field', () => {
  it('should render InputField', () => {
    const props = {
      placeholder: 'Type here',
      name: 'username',
      error: 'Invalid username',
    };
    const wrapper = shallow(<InputField {...props} />);
    expect(wrapper.find('[name="username"]')).toHaveLength(1);
  });
  it('should display error when error passed', () => {
    const props = {
      placeholder: 'Type here',
      name: 'username',
      error: 'Invalid username',
    };
    const wrapper = shallow(<InputField {...props} />);
    expect(wrapper.find('span')).toHaveLength(1);
  });
  it('should handle changes', () => {
    const handleChange = jest.fn();
    const props = {
      placeholder: 'Type here',
      name: 'username',
      error: 'Invalid username',
    };
    const wrapper = shallow(<InputField onChange={handleChange} {...props} />);
    wrapper.find('input').props().onChange();
    expect(handleChange).toHaveBeenCalled();
  });
});
