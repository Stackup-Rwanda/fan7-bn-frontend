/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { mount, shallow } from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import EditProfilePage from '../EditProfilePage';
import Spinner from '../../../components/Spinner';
import Sidebar from '../../../components/profile/EditProfileSideBar';
import ProfileForm from '../../../components/profile/ProfileForm';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const history = {
  push: jest.fn(),
  replace: jest.fn(),
  createHref: jest.fn(),
};

describe('EditProfilePage Component Test', () => {
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
    }};
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <EditProfilePage />
        </Router>
      </Provider>,
    );

    expect(wrapper.find('.editProfile').exists()).toBe(true);
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
          <EditProfilePage />
        </Router>
      </Provider>,
    );

    expect(wrapper.find(Spinner).exists()).toBe(true);
  });

  it('should display Sidebar if it is not loading', () => {
    localStorage.setItem('barefoot_nomad_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJlbHZpc3J1Z2FtYmFAZ21haWwuY29tIiwicm9sZSI6Im1hbmFnZXIiLCJpbWFnZV91cmwiOm51bGwsImlhdCI6MTU4NjYyODg1OH0.i8T-qF8n0e4jySQkaP1G7bUG9oMmiL1BC6DYiJHknLE');

    const handleUpdateProfile = jest.fn();
    const data = { user_name: 'elvisR' };
    const image = 'img.jpg';
    const initialState = {
      userProfile: { loading: false, profile: {} },
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
          <EditProfilePage />
        </Router>
      </Provider>,
    );

    expect(wrapper.find(ProfileForm).exists()).toBe(true);

    wrapper
      .find(ProfileForm)
      .props()
      .updateProfile(data);
    wrapper
      .find(ProfileForm)
      .props()
      .updateProfile();
    wrapper
      .find(Sidebar)
      .props()
      .handleChange(image);
  });
});

describe('<EditProfilePage /> shallow rendering tests', () => {
  const initialState = {};
  const store = mockStore(initialState);

  it('matches the snapshot', () => {
    const tree = shallow(<EditProfilePage store={store} />);
    expect(tree).toMatchSnapshot();
  });
});
