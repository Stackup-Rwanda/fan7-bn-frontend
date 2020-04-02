import React from 'react';
import { mount, shallow } from 'enzyme';
import TableLoader from '../TableLoader';

describe('TableLoader Component Test', () => {
  it('should return true if component exists', () => {
    const wrapper = mount(<TableLoader />);

    expect(wrapper.find('.table-ellipsis').exists()).toBe(true);
  });
});

describe('<TableLoader /> shallow rendering tests', () => {
  it('matches the snapshot', () => {
    const tree = shallow(<TableLoader />);
    expect(tree).toMatchSnapshot();
  });
});
