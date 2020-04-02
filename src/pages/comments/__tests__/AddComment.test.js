import React from 'react';
import { mount , shallow } from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import ConfigureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import Comment from '../index';

const middlewares = [thunk];
const mockStore = ConfigureStore(middlewares);

const history = {
    push: jest.fn(),
    replace: jest.fn(),
    createHref: jest.fn(),
};

describe('Comment Component Test', () => {
    it('should return true if component exists', () => {
        const initialState = {};
        const store = mockStore(initialState);
        const wrapper = mount(
            <Provider store={store}>
                <Router history={history}>
                <Comment />
                </Router>
            </Provider>
        );

        expect(wrapper.find('.request_container').exists()).toBe(true);
    });
    
    it('should display the content if it is not loading', () => {
        const initialState = {
            addComment: { isLoading:false, comments: [], request: [], comment: '' },
        };
        const store = mockStore(initialState);
        const wrapper = mount(
            <Provider store={store}>
                <Router history={history}>
                    <Comment />
                </Router>
            </Provider>,
        );
        expect(wrapper.find('.request_container_request').exists()).toBe(true);
        expect(wrapper.find('.request_container_comment').exists()).toBe(true);
        
    });
});

describe('<Comment /> shallow rendering tests', () => {
    const initialState = {};
    const store = mockStore(initialState);

    it('matches the snapshot', () => {
        const tree = shallow(<Comment store={store} />);
        expect(tree).toMatchSnapshot();
    });
});