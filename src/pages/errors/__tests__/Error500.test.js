import React from 'react';
import { mount, shallow } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import Error500 from '../Error500';

const history = {
  push: jest.fn(),
  replace: jest.fn(),
  createHref: jest.fn(),
};

describe('Error500 Component Test', () => {
  it('should return true if component exists', () => {
    const wrapper = mount(
      <Router history={history}>
        <Error500 />
      </Router>,
    );

    expect(wrapper.find('.error').exists()).toBe(true);
    expect(wrapper.find('h1').text()).toEqual('500');
  });
});

describe('<Error500 /> shallow rendering tests', () => {
  it('matches the snapshot', () => {
    const tree = shallow(<Error500 />);
    expect(tree).toMatchSnapshot();
  });
});
