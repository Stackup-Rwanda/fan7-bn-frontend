import React from 'react';
import { mount } from 'enzyme';
import SocialButtons from '../index';

describe('SocialButtons', () => {
  const wrapper = mount(<SocialButtons />);
  const { location } = window;
  beforeAll(() => {
    delete window.location;
    window.location = { assign: jest.fn() };
  });

  afterAll(() => {
    window.location = location;
  });

  it('should have 2 buttons (Google and Facebook button)', () => {
    expect(wrapper.find('.socialBtn img')).toHaveLength(2);
  });
  it('should get Facebook Button', () => {
    expect(wrapper.find('Button').first().props().name).toEqual('facebook');
  });

  it('should get Google Button', () => {
    expect(wrapper.find('Button').last().props().name).toEqual('google');
  });
  it('should call REST API with (window.location.assign)', () => {
    wrapper.find('Button').first().props().onClick();
    wrapper.find('Button').last().props().onClick();
    expect(window.location.assign).toHaveBeenCalled();
  });
});
