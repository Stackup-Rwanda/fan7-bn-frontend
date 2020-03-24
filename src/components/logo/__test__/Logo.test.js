/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { mount } from 'enzyme';
import Logo from '../logo';

describe('Render Logo component', () => {
    it('should render the Logo component successfully', () => {
        const wrapper = mount(<Logo />);
    
        expect(wrapper.text()).toEqual('Barefoot Nomad');
      });
});
