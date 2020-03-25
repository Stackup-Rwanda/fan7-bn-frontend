import React from 'react';
import { shallow } from 'enzyme';
import DynamicDashboard from '../Dashboard';

describe('Dynamic Dashboard Tests', () => {
  it('should return true if sidebar exists', () => {
    const wrapper = shallow(<DynamicDashboard />);
    expect(wrapper.find('.dynamic_sidebar').exists()).toBe(true);
  });
});
