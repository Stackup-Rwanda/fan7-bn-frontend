/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { mount, shallow } from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import Request from './';
import Chatbot from '../../components/Chatbot';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const history = {
  push: jest.fn(),
  replace: jest.fn(),
  createHref: jest.fn(),
};

describe('Request Component Test', () => {
  beforeEach(() => {
    localStorage.setItem('barefoot_nomad_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsInNvY2lhbF9pZCI6IjExMzQzOTIwNjYyNDI1NTM0NzA2NiIsInVzZXJuYW1lIjoiTWlzdGljbyBDbGVtZW50IiwiaW1hZ2UiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQU9oMTRHZ01DX0lUc096b251WFhEVDU4a0J3aWpoaHlIeS1sa0wyTUpTR2hzZyIsInByb3ZpZGVyIjoiZ29vZ2xlIiwiaWF0IjoxNTg2Mjc1NTQzfQ.EqpaqDDAUdPXryiczJPsRxylfSVQts4t9Nhm5AUZPhM');
  });
  it('should return true if component exists', () => {
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

describe('<Chat />', () => {
  beforeEach(() => {
    localStorage.setItem('barefoot_nomad_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsInNvY2lhbF9pZCI6IjExMzQzOTIwNjYyNDI1NTM0NzA2NiIsInVzZXJuYW1lIjoiTWlzdGljbyBDbGVtZW50IiwiaW1hZ2UiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQU9oMTRHZ01DX0lUc096b251WFhEVDU4a0J3aWpoaHlIeS1sa0wyTUpTR2hzZyIsInByb3ZpZGVyIjoiZ29vZ2xlIiwiaWF0IjoxNTg2Mjc1NTQzfQ.EqpaqDDAUdPXryiczJPsRxylfSVQts4t9Nhm5AUZPhM');
  });
  it('should have Chatbot', () => {
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
          <Chatbot />
        </Router>
      </Provider>
    );

    expect(wrapper.find('div.chat_icon').exists()).toBe(true);
  });
})