import React from 'react';
import { mount, shallow } from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import UserRole from '../userRole';
import Spinner from '../../Spinner/index';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const history = {
  push: jest.fn(),
  replace: jest.fn(),
  createHref: jest.fn(),
};

describe('UserRole Settings Component Test', () => {
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
          },
            role: { loading: false,
                users: [{
                    email: "e.kskemc@gmail.com",
                    role: "requester"
                }],
            },

        };
        const store = mockStore(initialState);
        const wrapper = mount(
          <Provider store={store}>
            <Router history={history}>
              <UserRole />
            </Router>
          </Provider>,
        );
    
        expect(wrapper.find('.body_display').exists()).toBe(true);
      });

    it('should display spinner if it\'s loading', () => {
        const initialState = {
          chat: {
            messages: {
              senderId: 1,
              sender: 'The Great',
              message: 'Test react',
              createdAt: '01-03-2019'
            }
          },
            role: { loading: true,
                users: [{
                    email: "e.kskemc@gmail.com",
                    role: "requester"
                }],
            },
        };
        const store = mockStore(initialState);
        const wrapper = mount(
          <Provider store={store}>
            <Router history={history}>
              <UserRole />
            </Router>
          </Provider>,
        );
    
        expect(wrapper.find(Spinner).exists()).toBe(true);
      });

      it('should display content if it is not loading', () => {
        const initialState = {
          chat: {
            messages: {
              senderId: 1,
              sender: 'The Great',
              message: 'Test react',
              createdAt: '01-03-2019'
            }
          },
          role: { loading: false,
            users: [{
                email: "e.kskemc@gmail.com",
                role: "requester"
            }],
         },
        };
        const store = mockStore(initialState);
        const wrapper = mount(
          <Provider store={store}>
            <Router history={history}>
              <UserRole />
            </Router>
          </Provider>,
        );
    
        expect(wrapper.find('.body_display_table').exists()).toBe(true);
        expect(wrapper.find('.body_display_pagination').exists()).toBe(true);
    });
});

describe('<UserRole /> shallow rendering tests', () => {
  beforeEach(() => {
    localStorage.setItem('barefoot_nomad_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsInNvY2lhbF9pZCI6IjExMzQzOTIwNjYyNDI1NTM0NzA2NiIsInVzZXJuYW1lIjoiTWlzdGljbyBDbGVtZW50IiwiaW1hZ2UiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQU9oMTRHZ01DX0lUc096b251WFhEVDU4a0J3aWpoaHlIeS1sa0wyTUpTR2hzZyIsInByb3ZpZGVyIjoiZ29vZ2xlIiwiaWF0IjoxNTg2Mjc1NTQzfQ.EqpaqDDAUdPXryiczJPsRxylfSVQts4t9Nhm5AUZPhM');
  });
    const initialState = {
        role: { loading: false,
            users: [{
                email: "e.kskemc@gmail.com",
                role: "requester"
            }],
        },

    };
    const store = mockStore(initialState);
  
    it('matches the snapshot', () => {
      const tree = shallow(<UserRole store={store} />);
      expect(tree).toMatchSnapshot();
    });
});

describe('Should handle Dropdown',() => {
  beforeEach(() => {
    localStorage.setItem('barefoot_nomad_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsInNvY2lhbF9pZCI6IjExMzQzOTIwNjYyNDI1NTM0NzA2NiIsInVzZXJuYW1lIjoiTWlzdGljbyBDbGVtZW50IiwiaW1hZ2UiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQU9oMTRHZ01DX0lUc096b251WFhEVDU4a0J3aWpoaHlIeS1sa0wyTUpTR2hzZyIsInByb3ZpZGVyIjoiZ29vZ2xlIiwiaWF0IjoxNTg2Mjc1NTQzfQ.EqpaqDDAUdPXryiczJPsRxylfSVQts4t9Nhm5AUZPhM');
  });
    
    it('Should display Dropdown  ', () => {
        const initialState = {
          chat: {
            messages: {
              senderId: 1,
              sender: 'The Great',
              message: 'Test react',
              createdAt: '01-03-2019'
            }
          },
            role: { loading: false,
                users: [{
                    email: "e.kskemc@gmail.com",
                    role: "requester"
                }],
            },
        };
        const store = mockStore(initialState);
        const wrapper = mount(
            <Provider store={store}>
              <Router history={history}>
                <UserRole />
              </Router>
            </Provider>,
          );
  
    });
});