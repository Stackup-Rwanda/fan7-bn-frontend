import React from 'react';
import { shallow } from 'enzyme';
import DisplayUsers from '../DisplayUsers';


describe('DisplayUsers Component Test', () => {
    it('should return true if component exists', () => {
        const props = {
            users: [{
                email: "e.kskemc@gmail.com",
                role: "requester"
            }],
        };
        const wrapper = shallow(<DisplayUsers {...props} />);
        expect(wrapper.find('tr').exists()).toBe(true);
    });

    it('Should handle click', () => {
        const event = {
            preventDefault: jest.fn(),
            target: {
                dataset: {
                    email: 'e.kskemc@gmail.com'
                }
            },
        };
        const props = {
            handleDropdown: jest.fn(),
            users: [{
                email: "e.kskemc@gmail.com",
                role: "requester"
            }],
        };
        const wrapper = shallow(<DisplayUsers {...props} />);

        wrapper.find('img').simulate('click', event);

        expect(props.handleDropdown).toHaveBeenCalled();
    })

});

describe('<DisplayUsers /> shallow rendering tests', () => {
    const props = {
        users: [{
            email: "e.kskemc@gmail.com",
            role: "requester"
        }],
    };
    it('matches the snapshot', () => {
        const tree = shallow(<DisplayUsers {...props} />);
        expect(tree).toMatchSnapshot();
    });

});