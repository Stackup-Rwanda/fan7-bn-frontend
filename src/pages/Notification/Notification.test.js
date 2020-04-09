/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { mount, shallow } from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import Notification from './';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const history = {
  push: jest.fn(),
  replace: jest.fn(),
  createHref: jest.fn(),
};

describe('Notification Component Test', () => {
  it('should return true if component exists', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <Notification />
        </Router>
      </Provider>
    );

    expect(wrapper.find('.notification').exists()).toBe(true);
  });

  it('should list notifications if found', () => {
    const initialState = {
      notifications: {
        notifications: [
          {
            id: 8,
            message: 'New request has been created, waiting for approval',
            request_id: 11,
            status: 'unread',
            type: 'Created',
          },
        ],
      },
    };
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <Notification />
        </Router>
      </Provider>
    );

    expect(wrapper.find('.notification__item').exists()).toBe(true);
  });

  it('should not list notifications if not found', () => {
    const initialState = {
      notifications: {
        notifications: [],
      },
    };
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <Notification />
        </Router>
      </Provider>
    );

    expect(wrapper.find('.notification__item').exists()).toBe(false);
  });

  it('should handle redirect', () => {
    const initialState = {
      notifications: {
        notifications: [
          {
            id: 8,
            message: 'New request has been created, waiting for approval',
            request_id: 11,
            status: 'unread',
            type: 'Created',
          },
        ],
      },
    };
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <Notification />
        </Router>
      </Provider>
    );

    wrapper.find('.notification__item__content').simulate('click');
    expect(wrapper.find('.notification__item__content').exists()).toBe(true);
  });

  it('should handle mark all notifications as read', () => {
    const initialState = {
      notifications: {
        notifications: [
          {
            id: 8,
            message: 'New request has been created, waiting for approval',
            request_id: 11,
            status: 'unread',
            type: 'Created',
          },
          {
            id: 9,
            message: 'New request has been created, waiting for approval',
            request_id: 12,
            status: 'unread',
            type: 'Created',
          },
        ],
      },
    };
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <Notification />
        </Router>
      </Provider>
    );

    wrapper.find('.notification__footer__button').simulate('click');
    expect(wrapper.find('.notification__footer__button').exists()).toBe(true);
  });

  it('should display loader while marking all notifications as read', () => {
    const initialState = {
      notifications: {
        notifications: [
          {
            id: 8,
            message: 'New request has been created, waiting for approval',
            request_id: 11,
            status: 'unread',
            type: 'Created',
          },
          {
            id: 9,
            message: 'New request has been created, waiting for approval',
            request_id: 12,
            status: 'unread',
            type: 'Created',
          },
        ],
        loading: true,
      },
    };
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <Notification />
        </Router>
      </Provider>
    );

    expect(wrapper.find('.notification__footer').text()).toEqual('Marking all as read...');
  });
});

describe('<Notification /> shallow rendering tests', () => {
  const initialState = {};
  const store = mockStore(initialState);

  it('matches the snapshot', () => {
    const tree = shallow(<Notification store={store} />);
    expect(tree).toMatchSnapshot();
  });
});
