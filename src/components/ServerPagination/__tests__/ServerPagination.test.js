/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { mount, shallow } from 'enzyme';
import Pagination from '../ServerSidePagination';

describe('Pagination Component Test', () => {
  const onChangePage = jest.fn();
  const props = {
    handleChangePage: onChangePage,
    totalRows: 9
  }
  const event = {
    target: { value: '2' },
  };
  const wrapper = shallow(<Pagination {...props} />);

  it('should return true if component exists', () => {
    expect(wrapper.find('.pagination-container').exists()).toBe(true);
  });

  it('should handle selectPageNumber', () => {
    wrapper.find('select[name="page"]').simulate('change', event);

    expect(onChangePage).toHaveBeenCalled();
  });

  it('should handle selectRowsPerPage and not update page', () => {

    wrapper.find('select[name="rowsPerPage"]').simulate('change', event);

    expect(onChangePage).toHaveBeenCalled();
  });

  it('should handle selectRowsPerPage and update page', () => {

    wrapper.find('select[name="rowsPerPage"]').simulate('change', event);

    expect(onChangePage).toHaveBeenCalled();
  });

  it('should handle incrementPage', () => {

    wrapper.find('button[name="increment"]').simulate('click', event);

    expect(onChangePage).toHaveBeenCalled();
  });

  it('should handle decrementPage', () => {

    wrapper.find('button[name="decrement"]').simulate('click', event);

    expect(onChangePage).toHaveBeenCalled();
  });

});
