/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { mount, shallow } from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import ProfilePage from '../ProfilePage';
import Spinner from '../../../components/Spinner';
import Card from '../../../components/profile/ProfileCard';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const history = {
  push: jest.fn(),
  replace: jest.fn(),
  createHref: jest.fn(),
};

describe('ProfilePage Component Test', () => {
  it('should return true if component exists', () => {
    localStorage.setItem('barefoot_nomad_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJlbHZpc3J1Z2FtYmFAZ21haWwuY29tIiwicm9sZSI6Im1hbmFnZXIiLCJpbWFnZV91cmwiOm51bGwsImlhdCI6MTU4NjYyODg1OH0.i8T-qF8n0e4jySQkaP1G7bUG9oMmiL1BC6DYiJHknLE');

    const initialState = {
      chat: {
        messages: {
          senderId: 1,
          sender: 'The Great',
          message: 'Test react',
          createdAt: '01-03-2019'
        }
      }
    };
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <ProfilePage />
        </Router>
      </Provider>
    );

    expect(wrapper.find('.profile').exists()).toBe(true);
  });

  it("should display spinner if it's loading", () => {
    localStorage.setItem('barefoot_nomad_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJlbHZpc3J1Z2FtYmFAZ21haWwuY29tIiwicm9sZSI6Im1hbmFnZXIiLCJpbWFnZV91cmwiOm51bGwsImlhdCI6MTU4NjYyODg1OH0.i8T-qF8n0e4jySQkaP1G7bUG9oMmiL1BC6DYiJHknLE');

    const initialState = {
      userProfile: { loading: true },
      chat: {
        messages: {
          senderId: 1,
          sender: 'The Great',
          message: 'Test react',
          createdAt: '01-03-2019'
        }
      }
    };
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <ProfilePage />
        </Router>
      </Provider>
    );

    expect(wrapper.find(Spinner).exists()).toBe(true);
  });

  it('should display content if it is not loading', () => {
    localStorage.setItem('barefoot_nomad_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJlbHZpc3J1Z2FtYmFAZ21haWwuY29tIiwicm9sZSI6Im1hbmFnZXIiLCJpbWFnZV91cmwiOm51bGwsImlhdCI6MTU4NjYyODg1OH0.i8T-qF8n0e4jySQkaP1G7bUG9oMmiL1BC6DYiJHknLE');

    const initialState = {
      userProfile: { loading: false },
      chat: {
        messages: {
          senderId: 1,
          sender: 'The Great',
          message: 'Test react',
          createdAt: '01-03-2019'
        }
      }
    };
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <ProfilePage />
        </Router>
      </Provider>
    );

    expect(wrapper.find('.profile-card').exists()).toBe(true);
    expect(wrapper.find('.profile-content').exists()).toBe(true);

    wrapper
      .find(Card)
      .props()
      .handleNavigation('trips');
  });
});

describe('<ProfilePage /> shallow rendering tests', () => {
  const initialState = {};
  const store = mockStore(initialState);

  it('matches the snapshot', () => {
    const tree = shallow(<ProfilePage store={store} />);
    expect(tree).toMatchSnapshot();
  });
});
