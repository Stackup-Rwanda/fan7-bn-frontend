import React from 'react';
import { shallow } from 'enzyme';
import AuthLayout from './AuthLayout';

describe('Auth Layout component test', () => {
    it('should return false if component does not exists', () => {
        const p = ()  => 'p';
        const wrapper = shallow(<AuthLayout />);
        expect(wrapper.find(p).exists()).toBe(false);
    });
});

describe('<AuthLayout /> shallow rendering tests', () => {
    it('matches the snapshot', () => {
      const tree = shallow(<AuthLayout />);
      expect(tree).toMatchSnapshot();
    });
  });