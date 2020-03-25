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
    const initialState = {};
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <ProfilePage />
        </Router>
      </Provider>,
    );

    expect(wrapper.find('.profile').exists()).toBe(true);
  });

  it('should display spinner if it\'s loading', () => {
    const initialState = {
      userProfile: { loading: true },
    };
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <ProfilePage />
        </Router>
      </Provider>,
    );

    expect(wrapper.find(Spinner).exists()).toBe(true);
  });

  it('should display content if it is not loading', () => {
    const initialState = {
      userProfile: { loading: false },
    };
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <ProfilePage />
        </Router>
      </Provider>,
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
