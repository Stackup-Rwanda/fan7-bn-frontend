/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { mount, shallow } from 'enzyme';
import ProfileFeeds from '../ProfileFeeds';

describe('ProfileFeeds Component Test', () => {
  it('should return true if component exists', () => {
    const wrapper = mount(<ProfileFeeds />);

    expect(wrapper.find('.feeds').exists()).toBe(true);
  });

  it('should display appropriate text value', () => {
    const props = {
      gender: 'Male',
      dob: '1999-1-1',
    };
    const wrapper = shallow(<ProfileFeeds {...props} />);

    expect(
      wrapper
        .find('.feeds-card1__content___text')
        .first()
        .text()
    ).toEqual('Gender: Male');

    expect(
      wrapper
        .find('.feeds-card1__content___text')
        .at(1)
        .text()
    ).toEqual('Birthday: 01/01/1999');

    expect(
      wrapper
        .find('.feeds-card1__content___text')
        .last()
        .text()
    ).toEqual('Current location');
  });

  it('should display appropriate props', () => {
    const props = {
      address: 'Kigali',
    };
    const wrapper = shallow(<ProfileFeeds {...props} />);

    expect(
      wrapper
        .find('.feeds-card1__content___text')
        .first()
        .text()
    ).toEqual('Gender');

    expect(
      wrapper
        .find('.feeds-card1__content___text')
        .at(1)
        .text()
    ).toEqual('Birthday');

    expect(
      wrapper
        .find('.feeds-card1__content___text')
        .last()
        .text()
    ).toEqual('Location: Kigali');
  });
});

describe('<ProfileFeeds /> shallow rendering tests', () => {
  it('matches the snapshot', () => {
    const props = {
      gender: 'Male',
      dob: '1996-5-6',
      location: 'Kigali',
    };
    const tree = shallow(<ProfileFeeds {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
