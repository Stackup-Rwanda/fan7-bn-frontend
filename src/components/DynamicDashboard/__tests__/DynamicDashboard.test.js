import React from 'react';
import { shallow } from 'enzyme';
import DynamicDashboard from '../Dashboard';
import { requesterDashboard } from '../../../assets/sidebar';

describe('Dynamic Dashboard Tests', () => {
  it('should return true if sidebar exists', () => {
    const wrapper = shallow(<DynamicDashboard properties={requesterDashboard} />);
    expect(wrapper.find('.dynamic_sidebar').exists()).toBe(true);
  });
});
