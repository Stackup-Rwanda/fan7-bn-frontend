/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { mount, shallow } from 'enzyme';
import ManagerRequestTable from './';

describe('ManagerRequestTable Component Test', () => {
  it('should return true if component exists', () => {
    const wrapper = shallow(<ManagerRequestTable />);

    expect(wrapper.find('table').exists()).toBe(true);
  });

  it('should render appropriate props', () => {
    const props = {
      requests: [
        {
          id: 11,
          accommodation_id: 1,
          origin: 'rwanda, kigali',
          destination: ['burundi, bujumbura'],
          travel_date: ['2020-06-24'],
          return_date: null,
          reason: 'dddddddddd',
          status: 'Pending',
          user: { email: 'elvis@gmail.com' },
          accommodation: { name: 'Tam Tam' },
        },
        {
          id: 10,
          accommodation_id: null,
          origin: 'rwanda, kigali',
          destination: ['burundi, bujumbura'],
          travel_date: ['2020-05-22'],
          return_date: null,
          reason: 'dddddddddd',
          status: 'Pending',
          user: { email: 'elvis@gmail.com' },
          accommodation: { name: 'Tam Tam' },
        },
      ],
    };
    const wrapper = shallow(<ManagerRequestTable {...props} />);

    expect(wrapper.find('tbody tr').exists()).toBe(true);
  });
});

describe('<ManagerRequestTable /> shallow rendering tests', () => {
  it('matches the snapshot', () => {
    const props = {
      requests: [
        {
          id: 11,
          accommodation_id: 1,
          origin: 'rwanda, kigali',
          destination: ['burundi, bujumbura'],
          travel_date: ['2020-06-24'],
          return_date: null,
          reason: 'dddddddddd',
          status: 'Pending',
          user: { email: 'elvis@gmail.com' },
          accommodation: { name: 'Tam Tam' },
        },
        {
          id: 10,
          accommodation_id: 1,
          origin: 'rwanda, kigali',
          destination: ['burundi, bujumbura'],
          travel_date: ['2020-05-22'],
          return_date: null,
          reason: 'dddddddddd',
          status: 'Pending',
          user: { email: 'elvis@gmail.com' },
          accommodation: { name: 'Tam Tam' },
        },
      ],
    };
    const tree = shallow(<ManagerRequestTable {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
