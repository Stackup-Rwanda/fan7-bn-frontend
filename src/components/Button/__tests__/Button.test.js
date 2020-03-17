/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { shallow } from 'enzyme';
import Button from '../index';

describe('Button', () => {
  it('should render Button', () => {
    const props = {
      value: 'ClickMe',
      isloading: false,
    };
    const wrapper = shallow(<Button {...props} />);
    expect(wrapper.find('[type="submit"]')).toHaveLength(1);
  });
  it('should render when props passed in', () => {
    const props = {
      value: 'ClickMe',
      className: 'btn-test',
      isloading: false,
    };
    const wrapper = shallow(<Button {...props} />);
    expect(wrapper.find('[className="btn-test"]')).toHaveLength(1);
  });
  it('should handle click event', () => {
    const handleClick = jest.fn();
    const value = 'ClickMe';
    const wrapper = shallow(<Button onClick={handleClick} value={value} />);
    wrapper.find('button').props().onClick();
    expect(handleClick).toHaveBeenCalled();
  });
});
