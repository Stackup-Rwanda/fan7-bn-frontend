/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { mount, shallow } from 'enzyme';
import Pagination from './index';

describe('Pagination Component Test', () => {
  it('should return true if component exists', () => {
    const wrapper = shallow(<Pagination />);

    expect(wrapper.find('.pagination-container').exists()).toBe(true);
  });

  it('should handle selectPageNumber', () => {
    const onChangeRowsPerPage = jest.fn();
    const onChangePage = jest.fn();
    const props = {
      total: 20,
      rowsPerPage: [5, 10, 15, 20],
      page: 1,
      numberOfRows: 5,
      onChangeRowsPerPage,
      onChangePage,
    };

    const event = {
      target: { value: '2' },
    };

    const wrapper = shallow(<Pagination {...props} />);

    wrapper.find('select[name="page"]').simulate('change', event);

    expect(onChangePage).toHaveBeenCalled();
  });

  it('should handle selectRowsPerPage and not update page', () => {
    const onChangeRowsPerPage = jest.fn();
    const onChangePage = jest.fn();
    const props = {
      total: 20,
      rowsPerPage: [5, 10, 15, 20],
      page: 1,
      numberOfRows: 5,
      onChangeRowsPerPage,
      onChangePage,
    };
    const event = {
      target: { value: '10' },
    };

    const wrapper = shallow(<Pagination {...props} />);

    wrapper.find('select[name="rowsPerPage"]').simulate('change', event);

    expect(onChangeRowsPerPage).toHaveBeenCalled();
  });

  it('should handle selectRowsPerPage and update page', () => {
    const onChangeRowsPerPage = jest.fn();
    const onChangePage = jest.fn();
    const props = {
      total: 20,
      rowsPerPage: [5, 10, 15, 20],
      page: 2,
      numberOfRows: 5,
      onChangeRowsPerPage,
      onChangePage,
    };
    const event = {
      target: { value: '15' },
    };

    const wrapper = shallow(<Pagination {...props} />);

    wrapper.find('select[name="rowsPerPage"]').simulate('change', event);

    expect(onChangeRowsPerPage).toHaveBeenCalled();
  });

  it('should handle incrementPage', () => {
    const onChangeRowsPerPage = jest.fn();
    const onChangePage = jest.fn();
    const props = {
      total: 20,
      rowsPerPage: [5, 10, 15, 20],
      page: 1,
      numberOfRows: 5,
      onChangeRowsPerPage,
      onChangePage,
    };
    const event = {
      target: { value: '10' },
    };

    const wrapper = shallow(<Pagination {...props} />);

    wrapper.find('button[name="increment"]').simulate('click', event);

    expect(onChangePage).toHaveBeenCalled();
  });

  it('should handle decrementPage', () => {
    const onChangeRowsPerPage = jest.fn();
    const onChangePage = jest.fn();
    const props = {
      total: 20,
      rowsPerPage: [5, 10, 15, 20],
      page: 1,
      numberOfRows: 5,
      onChangeRowsPerPage,
      onChangePage,
    };
    const event = {
      target: { value: '10' },
    };

    const wrapper = shallow(<Pagination {...props} />);

    wrapper.find('button[name="decrement"]').simulate('click', event);

    expect(onChangePage).toHaveBeenCalled();
  });

  it('should render null if total equals to one', () => {
    const onChangeRowsPerPage = jest.fn();
    const onChangePage = jest.fn();
    const props = {
      total: 1,
      rowsPerPage: [5, 10, 15, 20],
      page: 1,
      numberOfRows: 5,
      onChangeRowsPerPage,
      onChangePage,
    };

    const wrapper = shallow(<Pagination {...props} />);

    expect(wrapper.find('select[name="page"]').text()).toEqual('');
  });
});

describe('<Pagination /> shallow rendering tests', () => {
  it('matches the snapshot', () => {
    const onChangeRowsPerPage = jest.fn();
    const onChangePage = jest.fn();
    const props = {
      total: 20,
      rowsPerPage: [5, 10, 15, 20],
      page: 1,
      numberOfRows: 5,
      onChangeRowsPerPage,
      onChangePage,
    };
    const tree = shallow(<Pagination {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
