import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import store from '../../../../store/store';

import AuthLayout from '../../../../containers/AuthLayout';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const history = {
  push: jest.fn(),
  replace: jest.fn(),
  createHref: jest.fn()
};

import Signup from '../index';
import { Router } from 'express';

React.useLayoutEffect = React.useEffect;

describe('Render Signup component', () => {
  it('Test signup render', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <Signup />
      </Provider>,
    );
    expect(wrapper.contains(<AuthLayout />));
  });

  // it('should return true if component exists', () => {
  //   const wrapper = mount(
  //     <Provider store={store}>
  //       <Router history={history}>
  //         <AuthLayout />
  //       </Router>
  //     </Provider>
  //   );
  //   expect(wrapper.find('.container').exists()).toBe(true);
  // });

  // it('should check if it is loading', () => {
  //   const props = {
  //     loading: true,
  //   };
  //   const wrapper = mount(<ProfileForm {...props} />);

  //   expect(wrapper.find('button[type="submit"]').text()).toEqual('Updating...');
  // });

  // it('should handle change', () => {
  //   const event = {
  //     persist: jest.fn(),
  //     target: {
  //       name: 'first_name',
  //       value: 'Elvis',
  //     },
  //   };
  //   const props = {
  //     loading: false,
  //   };
  //   const wrapper = shallow(<ProfileForm {...props} />);

  //   wrapper.find('input[name="first_name"]').simulate('change', event);

  //   expect(wrapper.state().user.first_name).toEqual('Elvis');
  // });

  // it('should handle submit', () => {
  //   const updateProfile = jest.fn();
  //   const event = {
  //     preventDefault: jest.fn(),
  //   };
  //   const props = {
  //     updateProfile,
  //   };
  //   const wrapper = shallow(<ProfileForm {...props} />);

  //   wrapper.find('form').simulate('submit', event);

  //   expect(updateProfile).toHaveBeenCalled();
  // });
});

// describe('<ProfileForm /> shallow rendering tests', () => {
//   it('matches the snapshot', () => {
//     const props = {
//       updateProfile: jest.fn(),
//     };
//     const tree = shallow(<ProfileForm {...props} />);
//     expect(tree).toMatchSnapshot();
//   });
// });
