import React from 'react';
import { mount, shallow } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import Error404 from '../Error404';

const history = {
  push: jest.fn(),
  replace: jest.fn(),
  createHref: jest.fn(),
};

describe('Error404 Component Test', () => {
  it('should return true if component exists', () => {
    const wrapper = mount(
      <Router history={history}>
        <Error404 />
      </Router>,
    );

    expect(wrapper.find('.error').exists()).toBe(true);
    expect(wrapper.find('h1').text()).toEqual('404');
  });
});

describe('<Error404 /> shallow rendering tests', () => {
  it('matches the snapshot', () => {
    const tree = shallow(<Error404 />);
    expect(tree).toMatchSnapshot();
  });
});
