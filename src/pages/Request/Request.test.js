/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { mount, shallow } from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import Request from './';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const history = {
  push: jest.fn(),
  replace: jest.fn(),
  createHref: jest.fn(),
};

describe('Request Component Test', () => {
  it('should return true if component exists', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <Request />
        </Router>
      </Provider>
    );

    expect(wrapper.find('.big-container').exists()).toBe(true);
  });
});

describe('<Request /> shallow rendering tests', () => {
  const initialState = {};
  const store = mockStore(initialState);

  it('matches the snapshot', () => {
    const tree = shallow(<Request store={store} />);
    expect(tree).toMatchSnapshot();
  });
});
