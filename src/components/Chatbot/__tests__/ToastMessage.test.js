import React from 'react';
import { mount, shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import ToastMessage from '../messageToast';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Chat Component Test', () => {
  beforeEach(() => {
    localStorage.setItem('barefoot_nomad_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsInNvY2lhbF9pZCI6IjExMzQzOTIwNjYyNDI1NTM0NzA2NiIsInVzZXJuYW1lIjoiTWlzdGljbyBDbGVtZW50IiwiaW1hZ2UiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQU9oMTRHZ01DX0lUc096b251WFhEVDU4a0J3aWpoaHlIeS1sa0wyTUpTR2hzZyIsInByb3ZpZGVyIjoiZ29vZ2xlIiwiaWF0IjoxNTg2Mjc1NTQzfQ.EqpaqDDAUdPXryiczJPsRxylfSVQts4t9Nhm5AUZPhM');
  });
  
  const props = {
    info: {
      sender: 'Mistico Tester',
    }
  }

  const initialState = {};
  const store = mockStore(initialState);
  
  it('should display a toast message', () => {
    const toaster = global.document.createElement('div');
    toaster.classList.add('toast_message');
    global.document.body.appendChild(toaster);

    const wrapper = mount(<ToastMessage {...props} store={store} />);
  
    expect(wrapper.find(".toast_message").exists()).toBe(true);
  });

});
