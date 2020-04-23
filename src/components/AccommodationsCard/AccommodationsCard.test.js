/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { mount, shallow } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import AccommodationsCard from './index';

const history = {
  push: jest.fn(),
  replace: jest.fn(),
  createHref: jest.fn(),
};

describe('AccommodationsCard Component Test', () => {
  it('should return true if component exists', () => {
    const props = { accommodation: {} };
    const wrapper = mount(<AccommodationsCard {...props} />);

    expect(wrapper.find('.accommodationsCard').exists()).toBe(true);
  });

  it('should render appropriate props', () => {
    const props = {
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
    };
    const wrapper = shallow(<AccommodationsCard {...props} />);

    expect(wrapper.find('.accommodationsCard__header__title').text()).toEqual('serena hotel');
  });

  it('should render appropriate props', () => {
    const props = {
      accommodation: {
        address: 'rwanda, kigali',
        amenities: ['WIFI'],
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
        ratings: [{ ratings: 4 }],
        rooms: [],
        services: ['conference hall', 'entertainment'],
      },
    };
    const wrapper = shallow(<AccommodationsCard {...props} />);

    expect(wrapper.find('.accommodationsCard__amenities__text').first().text()).toEqual('WIFI');
    expect(wrapper.find('.accommodationsCard__rating__value').text()).toEqual('4/5');
  });
});

// describe('<AccommodationsCard /> shallow rendering tests', () => {
//   it('matches the snapshot', () => {
//     const props = {
//       fullName: 'Test Test',
//       userName: 'testT',
//       profileImg: '',
//       handleNavigation: jest.fn(),
//     };
//     const tree = shallow(<AccommodationsCard {...props} />);
//     expect(tree).toMatchSnapshot();
//   });
// });
