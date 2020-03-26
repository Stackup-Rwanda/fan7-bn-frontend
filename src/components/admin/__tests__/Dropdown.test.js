import React from 'react';
import { shallow } from 'enzyme';
import Dropdown from '../Dropdown';

describe('Dropdown Component Test', () => {
    it('should return true if component exists', () => {
        const props = {
            loading: false,
            users: [{
                email: "e.kskemc@gmail.com",
                role: "requester"
            }],
        };
        const wrapper = shallow(<Dropdown {...props} />);

        expect(wrapper.find('.Dropdown').exists()).toBe(true);
    });

    it('Should handle click', () => {
        const event = {
            preventDefault: jest.fn(),
            target: {
                dataset: {
                    role: 'manager'
                }
            },
        };
        const props = {
            updateRole: jest.fn(),
            loading: false,
        };
        const wrapper = shallow(<Dropdown {...props} />);

        wrapper.find('.Dropdown_main_body_element1').first().simulate('click', event);

        expect(props.updateRole).toHaveBeenCalled();
    })

});

describe('<Dropdown /> shallow rendering tests', () => {
    const props = {
            loading: false,
            users: [{
                email: "e.kskemc@gmail.com",
                role: "requester"
            }],
    };
    it('matches the snapshot', () => {
        const tree = shallow(<Dropdown {...props} />);
        expect(tree).toMatchSnapshot();
    });

});