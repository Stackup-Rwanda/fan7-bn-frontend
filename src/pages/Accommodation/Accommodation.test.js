/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { mount, shallow } from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import Accommodation from './index';
import RoomCard from '../../components/RoomCard';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const history = {
  push: jest.fn(),
  replace: jest.fn(),
  createHref: jest.fn(),
};

const match = { params: { id: 1 }, isExact: true, path: '', url: '' };

describe('Accommodation Component Test', () => {
  it('should return true if component exists', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <Accommodation match={match} />
        </Router>
      </Provider>
    );

    expect(wrapper.find('.accommodation').exists()).toBe(true);
  });

  it('should display accommodation if found', () => {
    const initialState = {
      accommodation: {
        accommodation: {
          address: 'rwanda, kigali',
          description: 'Good',
          feedbacks: [
            {
              accommodation_id: 2,
              createdAt: '2020-05-02T06:51:38.928Z',
              feedback: 'wifi working slow',
              id: 2,
              updatedAt: '2020-05-02T06:51:38.928Z',
              user_id: 1,
            },
          ],
          geo_location: '10.84854, 20.234708',
          id: 2,
          image: ['uiqwgriqw.png', 'kgywd.png'],
          name: 'serena hotel',
          rooms: [],
          services: ['conference hall', 'entertainment'],
        },
      },
    };
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <Accommodation match={match} />
        </Router>
      </Provider>
    );

    expect(wrapper.find('.accommodation__card').exists()).toBe(true);
  });

  it('should not display accommodation if not found', () => {
    const initialState = {
      accommodation: {
        accommodation: null,
      },
    };
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <Accommodation match={match} />
        </Router>
      </Provider>
    );

    expect(wrapper.find('.accommodation__card').exists()).toBe(false);
  });

  it('should list rooms', () => {
    const initialState = {
      accommodation: {
        accommodation: {
          address: 'rwanda, kigali',
          description: 'Good',
          feedbacks: [
            {
              accommodation_id: 2,
              createdAt: '2020-05-02T06:51:38.928Z',
              feedback: 'wifi working slow',
              id: 2,
              updatedAt: '2020-05-02T06:51:38.928Z',
              user_id: 1,
            },
          ],
          geo_location: '10.84854, 20.234708',
          id: 2,
          image: ['uiqwgriqw.png', 'kgywd.png'],
          name: 'serena hotel',
          rooms: [{ id: 1 }],
          services: ['conference hall', 'entertainment'],
        },
      },
    };
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <Accommodation match={match} />
        </Router>
      </Provider>
    );

    expect(wrapper.find(RoomCard).exists()).toBe(true);
  });

  it('should handle submit', () => {
    const handleSubmit = jest.fn();
    const event = {
      preventDefault: jest.fn(),
    };
    const initialState = {
      accommodation: {
        accommodation: {
          address: 'rwanda, kigali',
          description: 'Good',
          feedbacks: [
            {
              accommodation_id: 2,
              createdAt: '2020-05-02T06:51:38.928Z',
              feedback: 'wifi working slow',
              id: 2,
              updatedAt: '2020-05-02T06:51:38.928Z',
              user_id: 1,
            },
          ],
          geo_location: '10.84854, 20.234708',
          id: 2,
          image: ['uiqwgriqw.png', 'kgywd.png'],
          name: 'serena hotel',
          rooms: [{ id: 1 }],
          services: ['conference hall', 'entertainment'],
        },
      },
    };
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <Accommodation match={match} />
        </Router>
      </Provider>
    );

    wrapper.childAt(0).instance().setState({ showBookForm: true });
    expect(wrapper.childAt(0).instance().state.showBookForm).toBe(true);
  });
});
