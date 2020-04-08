/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { mount, shallow } from 'enzyme';
import ProfileForm from '../ProfileForm';

describe('ProfileForm Component Test', () => {
  it('should return true if component exists', () => {
    const wrapper = mount(<ProfileForm />);

    expect(wrapper.find('form').exists()).toBe(true);
  });

  it('should check if it is loading', () => {
    const props = {
      loading: true,
    };
    const wrapper = mount(<ProfileForm {...props} />);

    expect(wrapper.find('button[type="submit"]').text()).toEqual('Updating...');
  });

  it('should handle change', () => {
    const event = {
      persist: jest.fn(),
      target: {
        name: 'first_name',
        value: 'Elvis',
      },
    };
    const props = {
      loading: false,
    };
    const wrapper = shallow(<ProfileForm {...props} />);

    wrapper.find('input[name="first_name"]').simulate('change', event);

    expect(wrapper.state().user.first_name).toEqual('Elvis');
  });

  it('should handle submit', () => {
    const updateProfile = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    const props = {
      updateProfile,
    };
    const wrapper = shallow(<ProfileForm {...props} />);

    wrapper.find('form').simulate('submit', event);

    expect(updateProfile).toHaveBeenCalled();
  });
});

// describe('<ProfileForm /> shallow rendering tests', () => {
//   it('matches the snapshot', () => {
//     const props = {
//       updateProfile: jest.fn(),
//     };
//     const tree = shallow(<ProfileForm {...props} />);
//     expect(tree).toMatchSnapshot();
//   });
// });
