/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { mount, shallow } from 'enzyme';
import DropdownMenu from './';
import notification from '../../assets/icons/notification.png';

describe('DropdownMenu Component Test', () => {
//   it('should throw an error if no children', () => {
//     const props = {
//       children: [],
//     };

//     const wrapper = shallow(<DropdownMenu {...props} />);

//     expect(() => {
//       wrapper;
//     }).toThrow('DropdownMenu must have at least one MenuItem child.');
//   });

  it('should return true if component exists', () => {
    const props = {
      icon: notification,
    };

    const wrapper = shallow(
      <DropdownMenu {...props}>
        <p>Menu item</p>
      </DropdownMenu>
    );

    expect(wrapper.find('.dropdown-menu').exists()).toBe(true);
  });

  it('should render icon', () => {
    const props = {
      icon: notification,
    };

    const wrapper = shallow(
      <DropdownMenu {...props}>
        <p>Menu item</p>
      </DropdownMenu>
    );

    expect(wrapper.find('.dropdown-menu__icon').exists()).toBe(true);
  });

  it('should render text', () => {
    const props = {
      text: 'Menu',
    };

    const wrapper = shallow(
      <DropdownMenu {...props}>
        <p>Menu item</p>
      </DropdownMenu>
    );

    expect(wrapper.find('.dropdown-menu__text').exists()).toBe(true);
  });

  it('should toggle menu', () => {
    const props = {
      icon: notification,
    };
    const event = {
      preventDefault: jest.fn(),
    };

    const wrapper = shallow(
      <DropdownMenu {...props}>
        <p>Menu item</p>
      </DropdownMenu>
    );

    wrapper.find('.dropdown-menu__button').simulate('click', event);
    expect(wrapper.find('.show').exists()).toBe(true);
  });
});

describe('<DropdownMenu /> shallow rendering tests', () => {
  it('matches the snapshot', () => {
    const props = {
      icon: notification,
    };
    const tree = shallow(
      <DropdownMenu {...props}>
        <p>Menu item</p>
      </DropdownMenu>
    );
    expect(tree).toMatchSnapshot();
  });
});
