import React from 'react';

import { mount } from 'enzyme';

import App from '../App';

describe('Render App component', () => {
  it('should render the App component successfully', () => {
    const wrapper = mount(<App />);

    expect(wrapper.text()).toEqual('WELCOME TO BAREFOOT NOMAD');
  });
});
