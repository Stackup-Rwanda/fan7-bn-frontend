import React from 'react';
import { Router } from 'react-router-dom';
import { mount, render, shallow } from 'enzyme';


import history from '../utils/helpers/history';
import Routes from '../routes';

import Home from '../components';
import App from './App';
import Login from '../pages/Login/Login';
import Error from '../components/error';

describe('Render Home component', () => {
  it('should render the Home component successfully', () => {
    const wrapper = mount(<Home />);

    expect(wrapper.text()).toEqual('WELCOME TO BAREFOOT NOMAD');
  });

  // login page
  test('should return login page message', () => {
    render(
      <Router history={history}>
        <Routes />
      </Router>,
    );
    const wrapper = mount(<Login />);
  });

  // return error
  test('should return page not found', () => {
    render(
      <Router history={history}>
        <Routes />
      </Router>,
    );
    const wrapper = mount(<Error />);
    expect(wrapper.text()).toEqual('Page not found');
  });

  test('Test app render', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.contains(<Router history={history} />));
  });
});
