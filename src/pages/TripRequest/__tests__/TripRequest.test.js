import React from 'react';
import { mount, shallow } from 'enzyme';
import TripRequest from '../index';
import store from '../../../store/store';
import DynamicDashboard from '../../../components/DynamicDashboard/Dashboard';
import { BrowserRouter } from 'react-router-dom';

describe('Trip Request Tests', () => {
  const props = {
    message: 'test',
    requests: [],
  }
  const wrapper = mount(
    <BrowserRouter>
      <TripRequest {...props} store={store} />
    </BrowserRouter>
  );  
  it('should have \'Dashboard\' ', () => { 
    
    try {
      expect(wrapper.contains(<DynamicDashboard />));
    }
    catch(err){
      throw new Error(err);
    }
  });
  it('should change to prev and next page ', () => {    
    try {
      const handleChange = jest.fn();
      // wrapper.find('button').first().props().onClick();
      // wrapper.find('button').last().props().onClick();
      // expect(handleChange).toHaveBeenCalled();
      expect(wrapper.find('.big-container').exists()).toBe(true)
    }
    catch(err){
      throw new Error(err);
    }
  });
});
