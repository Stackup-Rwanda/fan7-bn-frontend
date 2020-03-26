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
    it('should return true if component exists', () => {
        const initialState = {
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
    
    it('Should display Dropdown  ', () => {
        const initialState = {
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