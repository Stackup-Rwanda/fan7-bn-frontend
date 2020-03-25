import React from 'react';
import { mount, shallow } from 'enzyme';
import ProfileAvatar from '../ProfileAvatar';

describe('ProfileAvatar Component Test', () => {
  it('should return true if component exists', () => {
    const wrapper = mount(<ProfileAvatar />);

    expect(wrapper.find('img').exists()).toBe(true);
  });
});

describe('<ProfileAvatar /> shallow rendering tests', () => {
  it('matches the snapshot', () => {
    const tree = shallow(<ProfileAvatar />);
    expect(tree).toMatchSnapshot();
  });
});
