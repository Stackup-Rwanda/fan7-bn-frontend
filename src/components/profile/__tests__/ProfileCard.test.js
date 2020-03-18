/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { mount, shallow } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import ProfileCard from '../ProfileCard';
import Avatar from '../ProfileAvatar';
import Menu from '../ProfileCardMenu';

const history = {
  push: jest.fn(),
  replace: jest.fn(),
  createHref: jest.fn(),
};

describe('ProfileCard Component Test', () => {
  it('should return true if component exists', () => {
    const wrapper = mount(
      <Router history={history}>
        <ProfileCard />
      </Router>,
    );

    expect(wrapper.find(Avatar).exists()).toBe(true);
    expect(wrapper.find(Menu).exists()).toBe(true);
  });

  it('should render appropriate props', () => {
    const props = {
      fullName: 'Test Test',
      userName: 'testT',
    };
    const wrapper = shallow(<ProfileCard {...props} />);

    expect(wrapper.find('.profile_card__text___fullname').text()).toEqual('Test Test');
    expect(wrapper.find('.profile_card__text___username').text()).toEqual('@testT');
  });
});

describe('<ProfileCard /> shallow rendering tests', () => {
  it('matches the snapshot', () => {
    const props = {
      fullName: 'Test Test',
      userName: 'testT',
      profileImg: '',
      handleNavigation: jest.fn(),
    };
    const tree = shallow(<ProfileCard {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
