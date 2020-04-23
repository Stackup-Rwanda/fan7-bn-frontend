/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { mount, shallow } from 'enzyme';
import RoomCard from './index';

describe('RoomCard Component Test', () => {
  it('should return true if component exists', () => {
    const props = { room: {} };
    const wrapper = mount(<RoomCard {...props} />);

    expect(wrapper.find('.roomCard').exists()).toBe(true);
  });

  it('should render appropriate props', () => {
    const props = {
      room: {
        id: 12,
        cost: '67000',
        type: 'standard',
        area: 3,
        room_number: 1289,
        total_bedrooms: 2,
        amenities: ['WIFI', 'Air conditioner'],
        accommodation_id: 2,
        booked: false,
        image: [
          'http://res.cloudinary.com/elvis-rugamba/image/upload/v1588413614/b6qwsr0fcoay8eafbpqk.jpg',
          'http://res.cloudinary.com/elvis-rugamba/image/upload/v1588413617/xr80ww5yj7ygjdh4vfhf.jpg',
        ],
      },
    };
    const wrapper = shallow(<RoomCard {...props} />);

    expect(wrapper.find('.roomCard__price').text()).toEqual('RWF 67000');
  });
});

// describe('<RoomCard /> shallow rendering tests', () => {
//   it('matches the snapshot', () => {
//     const props = {
//       fullName: 'Test Test',
//       userName: 'testT',
//       profileImg: '',
//       handleNavigation: jest.fn(),
//     };
//     const tree = shallow(<RoomCard {...props} />);
//     expect(tree).toMatchSnapshot();
//   });
// });
