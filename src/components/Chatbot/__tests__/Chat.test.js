import React from 'react';
import { mount, shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import Chatbot from '..';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Chat Component Test', () => {
  beforeEach(() => {
    localStorage.setItem('barefoot_nomad_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsInNvY2lhbF9pZCI6IjExMzQzOTIwNjYyNDI1NTM0NzA2NiIsInVzZXJuYW1lIjoiTWlzdGljbyBDbGVtZW50IiwiaW1hZ2UiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQU9oMTRHZ01DX0lUc096b251WFhEVDU4a0J3aWpoaHlIeS1sa0wyTUpTR2hzZyIsInByb3ZpZGVyIjoiZ29vZ2xlIiwiaWF0IjoxNTg2Mjc1NTQzfQ.EqpaqDDAUdPXryiczJPsRxylfSVQts4t9Nhm5AUZPhM');
  });
  
  const getChatMessages = jest.fn();
  const saveChatMessage = jest.fn();

  const props = {
    getChat: getChatMessages,
    saveMessage: saveChatMessage,
    messages: [{
      senderId: 1,
      sender: 'Mistico',
      message: 'Test message'
    }]
  }

  const initialState = {
    chat: {
      messages: {
        senderId: 1,
        sender: 'Me Test',
        message: 'Test react',
        createdAt: '01-03-2019'
      }
    }
  };
  const store = mockStore(initialState);
  
  it('should return true if component exists', () => {
    const wrapper = mount(<Chatbot {...props} store={store} />);
  
    expect(wrapper.find(".chat_icon").exists()).toBe(true);
  });

  it('should open a chat popup modal', () => {
    const chat = global.document.createElement('div');
    const chatBody = global.document.createElement('div');
    chat.classList.add('chat');
    chatBody.classList.add('chat_body');
    global.document.body.appendChild(chat);
    chat.appendChild(chatBody);

    const wrapper = mount(<Chatbot {...props} store={store} />);

    wrapper.find('img[name="popup"]').props().onClick();
  });

  it('Should allow user to write a message', () => {
    const wrapper = mount(<Chatbot {...props} store={store} />);
  
    wrapper.find('input[name="write_msg"]').simulate('change');
  });

  it('Enter key Should send a message', () => {
    const chat = global.document.createElement('div');
    const chatFooter = global.document.createElement('div');
    const chatFooterBody = global.document.createElement('div');
    const chatFooterBodyInput = global.document.createElement('input');
    chat.classList.add('chat');
    chatFooter.classList.add('chat_footer');
    chatFooterBody.classList.add('chat_footer_body');
    chatFooterBodyInput.classList.add('chat_footer_body_input');
    global.document.body.appendChild(chat);
    chat.appendChild(chatFooter);
    chatFooter.appendChild(chatFooterBody);
    chatFooterBody.appendChild(chatFooterBodyInput);

    const wrapper = mount(<Chatbot {...props} store={store} />);
  
    wrapper.find('input[name="write_msg"]').props().onKeyUp({keyCode: 13});
  });

  it('should handle Click on send message', () => {
    const chat = global.document.createElement('div');
    const chatFooter = global.document.createElement('div');
    const chatFooterBody = global.document.createElement('div');
    const chatFooterBodyInput = global.document.createElement('input');
    chat.classList.add('chat');
    chatFooter.classList.add('chat_footer');
    chatFooterBody.classList.add('chat_footer_body');
    chatFooterBodyInput.classList.add('chat_footer_body_input');
    global.document.body.appendChild(chat);
    chat.appendChild(chatFooter);
    chatFooter.appendChild(chatFooterBody);
    chatFooterBody.appendChild(chatFooterBodyInput);
    
    const wrapper = mount(<Chatbot {...props} store={store} />);
  
    wrapper.find('img[name="send_msg_img"]').simulate('click');
  });

});
