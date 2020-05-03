/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { mount, shallow } from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import Accommodations from './index';
import AccommodationsCard from '../../components/AccommodationsCard'
import Spinner from '../../components/Spinner'

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const history = {
  push: jest.fn(),
  replace: jest.fn(),
  createHref: jest.fn(),
};

describe('Accommodations Component Test', () => {
  it('should return true if component exists', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <Accommodations  />
        </Router>
      </Provider>
    );

    expect(wrapper.find('.accommodations').exists()).toBe(true);
  });

  it('should list accommodations if found', () => {
    const initialState = {
      accommodation: {
          loading: false,
        accommodations: [{
          address: 'rwanda, kigali',
          description: 'Good',
          feedbacks: [
            {
              Accommodations_id: 2,
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
        },]
      },
    };
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <Accommodations  />
        </Router>
      </Provider>
    );

    expect(wrapper.find(AccommodationsCard).exists()).toBe(true);
  });

  it('should not list accommodations if not found', () => {
    const initialState = {
      accommodation: {
          loading: false,
        accommodations: null
      },
    };
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <Accommodations  />
        </Router>
      </Provider>
    );

    expect(wrapper.find(AccommodationsCard).exists()).toBe(false);
  });

  it('should display spinner while loading', () => {
    const initialState = {
      accommodation: {
          loading: true,
        accommodations: [{
            address: 'rwanda, kigali',
            description: 'Good',
            feedbacks: [
              {
                Accommodations_id: 2,
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
            rooms: [{id: 1}],
            services: ['conference hall', 'entertainment'],
          },]
      },
    };
    const store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <Accommodations  />
        </Router>
      </Provider>
    );

    expect(wrapper.find(Spinner).exists()).toBe(true);
  });
//   it('should handle redirect', () => {
//     const initialState = {
//       Accommodations: {
//         Accommodations: {
//             address: 'rwanda, kigali',
//             description: 'Good',
//             feedbacks: [
//               {
//                 Accommodations_id: 2,
//                 createdAt: '2020-05-02T06:51:38.928Z',
//                 feedback: 'wifi working slow',
//                 id: 2,
//                 updatedAt: '2020-05-02T06:51:38.928Z',
//                 user_id: 1,
//               },
//             ],
//             geo_location: '10.84854, 20.234708',
//             id: 2,
//             image: ['uiqwgriqw.png', 'kgywd.png'],
//             name: 'serena hotel',
//             rooms: [{id: 1}],
//             services: ['conference hall', 'entertainment'],
//           },
//       },
//     };
//     const store = mockStore(initialState);
//     const wrapper = mount(
//       <Provider store={store}>
//         <Router history={history}>
//           <Accommodations  />
//         </Router>
//       </Provider>
//     );

//     wrapper.find('.Accommodations__item__content').simulate('click');
//     expect(wrapper.find('.Accommodations__item__content').exists()).toBe(true);
//   });
});

// describe('<Accommodations /> shallow rendering tests', () => {
//   const initialState = {};
//   const store = mockStore(initialState);

//   it('matches the snapshot', () => {
//     const tree = shallow(<Accommodations store={store} />);
//     expect(tree).toMatchSnapshot();
//   });
// });
