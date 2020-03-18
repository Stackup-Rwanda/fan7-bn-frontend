import React from 'react';
import { mount, shallow } from 'enzyme';
import EditProfileHeader from '../EditProfileHeader';

describe('EditProfileHeader Component Test', () => {
  it('should return true if component exists', () => {
    const wrapper = mount(<EditProfileHeader />);

    expect(wrapper.find('button[name="profile"]').exists()).toBe(true);
    expect(wrapper.find('button[name="notification"]').exists()).toBe(true);
    expect(wrapper.state().isActive).toEqual('profile');
  });

  it('should handle toggle active menu', () => {
    const event = {
      target: {
        name: 'notification',
      },
    };
    const wrapper = shallow(<EditProfileHeader />);

    wrapper.find('button[name="notification"]').simulate('click', event);

    expect(wrapper.state().isActive).toEqual('notification');
  });
});

describe('<EditProfileHeader /> shallow rendering tests', () => {
  it('matches the snapshot', () => {
    const tree = shallow(<EditProfileHeader />);
    expect(tree).toMatchSnapshot();
  });
});
