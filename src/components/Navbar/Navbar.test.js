/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { mount, shallow } from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './index';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const history = {
  push: jest.fn(),
  replace: jest.fn(),
  createHref: jest.fn(),
};

describe('Navbar Component Test', () => {
  it('should return true if component exists', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <Navbar />
        </Router>
      </Provider>
    );

    expect(wrapper.find('.home-navbar').exists()).toBe(true);
  });

  it('should display profile image', () => {
    const initialState = {
      userProfile: { profile: { image_url: false } },
    };
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <Navbar />
        </Router>
      </Provider>
    );

    expect(wrapper.find('.home-navbar__items__single2').exists()).toBe(true);
  });
});
