import React from 'react';
import { Router } from 'react-router-dom';
import { mount, shallow } from 'enzyme';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../store/reducers/socialReducer';

import history from '../utils/helpers/history';
import Routes from '../routes/Authenticantion';

import Home from '../components';
import App from './App';
import Error from '../components/error';

describe('Render Home component', () => {
  beforeEach(() => {
    const middlewares = [thunk];
    const testStore = (state) => {
      const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
      return createStoreWithMiddleware(reducers, state);
    };

    const setUp = (initialState = {}, props = {}) => {
      const store = testStore(initialState);
      return shallow(
        <Routes {...props} store={store} />,
      );
    };
  });

  it('should render the Home component successfully', () => {
    const wrapper = mount(<Home />);

    expect(wrapper.text()).toEqual('WELCOME TO BAREFOOT NOMAD');
  });

  // return error
  test('should return page not found', () => {
    const wrapper = mount(<Error />);
    expect(wrapper.text()).toEqual('Page not found');
  });

  test('Test app render', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.contains(<Router history={history} />));
  });
});
