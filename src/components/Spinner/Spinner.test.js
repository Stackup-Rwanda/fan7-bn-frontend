import React from 'react';
import { mount, shallow } from 'enzyme';
import Spinner from './index';

describe('Spinner Component Test', () => {
  it('should return true if component exists', () => {
    const wrapper = mount(<Spinner />);

    expect(wrapper.find('.loading').exists()).toBe(true);
    expect(wrapper.find('span').text()).toEqual('Loading...');
  });
});

describe('<Spinner /> shallow rendering tests', () => {
  it('matches the snapshot', () => {
    const tree = shallow(<Spinner />);
    expect(tree).toMatchSnapshot();
  });
});
