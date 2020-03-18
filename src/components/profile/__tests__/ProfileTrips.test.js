/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { mount, shallow } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import ProfileTrips from '../ProfileTrips';

const history = {
  push: jest.fn(),
  replace: jest.fn(),
  createHref: jest.fn(),
};

describe('ProfileTrips Component Test', () => {
  it('should return true if component exists', () => {
    const wrapper = mount(
      <Router history={history}>
        <ProfileTrips />
      </Router>,
    );

    expect(wrapper.find('.trips').exists()).toBe(true);
  });

  it('should display appropriate props', () => {
    const props = {
      trips: [{ destination: ['Nigeria, Lagos'], travel_date: ['2020-5-6'], status: 'pending' }],
    };
    const wrapper = shallow(<ProfileTrips {...props} />);

    expect(
      wrapper
        .find('tbody tr td')
        .first()
        .text(),
    ).toEqual('Nigeria, Lagos');
  });

  it('should display no trip  requests found', () => {
    const props = {
      trips: null,
    };
    const wrapper = shallow(<ProfileTrips {...props} />);

    expect(
      wrapper
        .find('tbody tr td')
        .first()
        .text(),
    ).toEqual('No trip requests found');
  });
});

describe('<ProfileTrips /> shallow rendering tests', () => {
  it('matches the snapshot', () => {
    const props = {
      trips: [{ destination: ['Nigeria, Lagos'], travel_date: ['2020-5-6'], status: 'pending' }],
    };
    const tree = shallow(<ProfileTrips {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
