import React from 'react';
import { shallow } from 'enzyme';
import DashboardLayout from '../index';

describe('DashboardLayout Component Test', () => {
  it('should return true if component exists', () => {
    const TextInput = () => 'text input';
    const DashboardLayoutHOCWrapper = DashboardLayout(TextInput);
    const wrapper = shallow(<DashboardLayoutHOCWrapper />);
    expect(wrapper.find(TextInput).exists()).toBe(true);
  });
});

describe('<DashboardLayout /> shallow rendering tests', () => {
  const TextInput = () => 'text input';
  const DashboardLayoutHOCWrapper = DashboardLayout(TextInput);
  it('matches the snapshot', () => {
    const tree = shallow(<DashboardLayoutHOCWrapper />);
    expect(tree).toMatchSnapshot();
  });
});
