/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { mount, shallow } from 'enzyme';
import ProfileCardMenu from '../ProfileCardMenu';

describe('ProfileCardMenu Component Test', () => {
  it('should return true if component exists', () => {
    const wrapper = mount(<ProfileCardMenu />);

    expect(wrapper.find('button[name="activityFeeds"]').exists()).toBe(true);
    expect(wrapper.find('button[name="trips"]').exists()).toBe(true);
    expect(wrapper.state().isActive).toEqual('activityFeeds');
  });

  it('should handle toggle active menu', () => {
    const handleNavigation = jest.fn();
    const event = {
      persist: jest.fn(),
      target: {
        name: 'trips',
      },
    };
    const props = {
      handleNavigation,
    };
    const wrapper = shallow(<ProfileCardMenu {...props} />);

    wrapper.find('button[name="trips"]').simulate('click', event);

    expect(handleNavigation).toHaveBeenCalled();
    expect(wrapper.state().isActive).toEqual('trips');
  });
});

describe('<ProfileCardMenu /> shallow rendering tests', () => {
  it('matches the snapshot', () => {
    const props = {
      updateProfile: jest.fn(),
    };
    const tree = shallow(<ProfileCardMenu {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
