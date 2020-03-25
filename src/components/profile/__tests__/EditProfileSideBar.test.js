/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { mount, shallow } from 'enzyme';
import EditProfileSideBar from '../EditProfileSideBar';

describe('EditProfileSideBar Component Test', () => {
  it('should return true if component exists', () => {
    const wrapper = mount(<EditProfileSideBar />);

    expect(wrapper.find('.sideBar').exists()).toBe(true);
  });

  it('should display appropriate props', () => {
    const props = {
      email: 'elvisrugamba@gmail.com',
    };
    const wrapper = mount(<EditProfileSideBar {...props} />);

    expect(
      wrapper
        .find('.sideBar__text')
        .first()
        .text()
    ).toEqual('Email: elvisrugamba@gmail.com');
  });

  it('should not handle change if image is not provided', () => {
    global.URL.createObjectURL = jest.fn();
    const handleChange = jest.fn();
    const event = {
      persist: jest.fn(),
      target: {
        files: [],
      },
    };
    const props = {
      handleChange,
    };
    const wrapper = shallow(<EditProfileSideBar {...props} />);

    wrapper.find('input[type="file"]').simulate('change', event);

    expect(handleChange).not.toHaveBeenCalled();
  });

  it('should not handle change if image is invalid', () => {
    global.URL.createObjectURL = jest.fn();
    const handleChange = jest.fn();
    const event = {
      persist: jest.fn(),
      target: {
        files: [{ name: 'image.txt' }],
      },
    };
    const props = {
      handleChange,
    };
    const wrapper = shallow(<EditProfileSideBar {...props} />);

    wrapper.find('input[type="file"]').simulate('change', event);

    expect(handleChange).not.toHaveBeenCalled();
  });

  it('should handle change if image is valid', () => {
    global.URL.createObjectURL = jest.fn();
    const handleChange = jest.fn();
    const event = {
      persist: jest.fn(),
      target: {
        files: [{ name: 'image.jpg' }],
      },
    };
    const props = {
      handleChange,
    };
    const wrapper = shallow(<EditProfileSideBar {...props} />);

    wrapper.find('input[type="file"]').simulate('change', event);

    expect(handleChange).toHaveBeenCalled();
  });
});

describe('<EditProfileSideBar /> shallow rendering tests', () => {
  it('matches the snapshot', () => {
    const props = {
      email: 'elvisrugamba@gmail.com',
      role: 'manager',
      handleChange: jest.fn(),
    };
    const tree = shallow(<EditProfileSideBar {...props} />);

    expect(tree).toMatchSnapshot();
  });
});
