import React from 'react';
import { mount, shallow } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import Error403 from '../Error403';

const history = {
  push: jest.fn(),
  replace: jest.fn(),
  createHref: jest.fn(),
};

describe('Error403 Component Test', () => {
  it('should return true if component exists', () => {
    const wrapper = mount(
      <Router history={history}>
        <Error403 />
      </Router>,
    );

    expect(wrapper.find('.error').exists()).toBe(true);
    expect(wrapper.find('h1').text()).toEqual('403');
  });
});

describe('<Error403 /> shallow rendering tests', () => {
  it('matches the snapshot', () => {
    const tree = shallow(<Error403 />);
    expect(tree).toMatchSnapshot();
  });
});
