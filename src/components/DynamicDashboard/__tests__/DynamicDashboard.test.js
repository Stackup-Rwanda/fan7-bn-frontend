import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import DynamicDashboard from '../Dashboard';
import { requesterDashboard } from '../../../assets/sidebar';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const history = {
  push: jest.fn(),
  replace: jest.fn(),
  createHref: jest.fn(),
  listen: jest.fn(),
};

describe('Dynamic Dashboard Tests', () => {
  it('should return true if sidebar exists', () => {
    const initialState = {};
    const store = mockStore(initialState);
    // const wrapper = shallow(<DynamicDashboard store={store} properties={requesterDashboard} />);
    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <DynamicDashboard properties={requesterDashboard} />
        </Router>
      </Provider>
    );
    expect(wrapper.find('.dynamic_sidebar').exists()).toBe(true);
  });
});
