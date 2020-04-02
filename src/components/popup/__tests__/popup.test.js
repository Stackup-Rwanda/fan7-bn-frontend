import React from 'react';
import { shallow } from 'enzyme';
import Popup from  '../popup';

describe('popup tests', () => {
it('should return true if component exists', () => {
    const wrapper = shallow(<Popup />);
    expect(wrapper.find('textarea').exists()).toBe(true);
});
it('should handle change', () => {
const event = {
    persist: jest.fn(),
    target: {
        name: 'comment',
        value: 'Hannah Montana'
    },
};
const props = {
    loading: false,
};
const wrapper = shallow(<Popup {...props} />);
wrapper.find('textarea[name="comment"]').simulate('change', event);

expect(wrapper.state().comment).toEqual('Hannah Montana');
});
it('should handle submit', () => {
    const addComment = jest.fn();
    const event = {
        preventDefault: jest.fn()
    };
    const props = {
        addComment,
    };
    const wrapper = shallow(<Popup {...props} />);
    wrapper.find('form').simulate('submit', event);
    expect(addComment).toHaveBeenCalled();
});
});