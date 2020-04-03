/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { mount, shallow } from 'enzyme';
import Table from '../index';

describe('Table Component Test', () => {
  it('should return true if component exists', () => {
    const wrapper = shallow(<Table />);

    expect(wrapper.find('table').exists()).toBe(true);
  });

  it('should have ONLY 1 thead element', () => {
    const wrapper = shallow(<Table />);

    expect(wrapper.find('thead')).toHaveLength(1);
  });

  it('should have ONLY 1 tbody tag', () => {
    const wrapper = shallow(<Table />);

    expect(wrapper.find('tbody')).toHaveLength(1);
  });

  it('should display Loader if data is being fetched', () => {
    const wrapper = shallow(<Table loading={true} />);

    expect(wrapper.find('.table-loader').exists()).toBe(true);
  });

  it('should renders in table rows based on provided columns', () => {
    const cols = [
      { header: 'ID', name: 'id' },
      { header: 'Name', name: 'name' },
      { header: 'Email', name: 'email' },
      { header: 'Language(s)', name: 'languages' },
    ];
    const data = [
      { id: 1, name: 'Elvis', email: 'elvisrugamba@example.com', languages: ['English', 'French'] },
      { id: 2, name: 'Sharon', email: 'sharon@example.com', languages: ['English', 'French'] },
      {
        id: 3,
        name: 'Clement',
        email: 'clement@example.com',
        languages: ['English', 'French'],
        someTest: 10,
      },
    ];

    const wrapper = shallow(<Table data={data} cols={cols} />);

    const table = wrapper.find('table');
    expect(table).toHaveLength(1);

    const thead = table.find('thead');
    expect(thead).toHaveLength(1);

    const headers = thead.find('th');
    expect(headers).toHaveLength(cols.length);
    headers.forEach((th, idx) => {
      expect(th.text()).toEqual(cols[idx].header);
    });

    const tbody = table.find('tbody');
    expect(tbody).toHaveLength(1);

    const rows = tbody.find('tr');
    expect(rows).toHaveLength(data.length);
    rows.forEach((tr, rowIndex) => {
      const cells = tr.find('td');
      expect(cells).toHaveLength(cols.length);
      // expect(cells.at(0).text()).toEqual(data[rowIndex].id);
      expect(cells.at(1).text()).toEqual(data[rowIndex].name);
      expect(cells.at(2).text()).toEqual(data[rowIndex].email);
    });
  });

  it('should display actions butoon if actions is optted in', () => {
    const cols = [
      { header: 'ID', name: 'id' },
      { header: 'Name', name: 'name' },
      { header: 'Email', name: 'email' },
      { header: 'Language(s)', name: 'languages' },
    ];
    const data = [
      { id: 1, name: 'Elvis', email: 'elvisrugamba@example.com', languages: ['English', 'French'] },
      { id: 2, name: 'Sharon', email: 'sharon@example.com', languages: ['English', 'French'] },
      {
        id: 3,
        name: 'Clement',
        email: 'clement@example.com',
        languages: ['English', 'French'],
        someTest: 10,
      },
    ];

    const wrapper = shallow(
      <Table data={data} cols={cols} actions={true} handleAction={() => {}} />
    );

    const table = wrapper.find('table');
    expect(table).toHaveLength(1);

    const thead = table.find('thead');
    expect(thead).toHaveLength(1);

    const headers = thead.find('th');
    expect(headers).toHaveLength(cols.length + 1);

    const tbody = table.find('tbody');
    expect(tbody).toHaveLength(1);

    const rows = tbody.find('tr');
    expect(rows).toHaveLength(data.length);
    rows.forEach((tr, rowIndex) => {
      const cells = tr.find('td');
      expect(cells).toHaveLength(cols.length + 1);
      expect(
        cells
          .last()
          .find('button')
          .exists()
      ).toBe(true);
    });
  });

  it('renders empty message as table cell if there is no data', () => {
    const cols = [
      { header: 'ID', name: 'id' },
      { header: 'Name', name: 'name' },
      { header: 'Email', name: 'email' },
      { header: 'Language(s)', name: 'languages' },
    ];

    const wrapper = shallow(<Table data={[]} cols={cols} />);

    const table = wrapper.find('table');
    expect(table).toHaveLength(1);

    const thead = table.find('thead');
    expect(thead).toHaveLength(1);

    const headers = thead.find('th');
    expect(headers).toHaveLength(cols.length);

    headers.forEach((th, idx) => {
      expect(th.text()).toEqual(cols[idx].header);
    });

    const tbody = table.find('tbody');
    expect(tbody).toHaveLength(1);

    const row = tbody.find('tr');
    expect(row).toHaveLength(1);

    const cell = row.find('td');
    expect(cell).toHaveLength(1);

    expect(cell.prop('colSpan')).toEqual(cols.length);

    expect(cell.text()).toEqual('There is no data in this table');
  });

  it('should renders empty message as table cell if there is no data and colspan to equal cols.length + 1 if actions is opted in', () => {
    const cols = [
      { header: 'ID', name: 'id' },
      { header: 'Name', name: 'name' },
      { header: 'Email', name: 'email' },
      { header: 'Language(s)', name: 'languages' },
    ];

    const wrapper = shallow(<Table data={[]} cols={cols} actions={true} />);

    const table = wrapper.find('table');
    expect(table).toHaveLength(1);

    const thead = table.find('thead');
    expect(thead).toHaveLength(1);

    const headers = thead.find('th');
    expect(headers).toHaveLength(cols.length + 1);

    const tbody = table.find('tbody');
    expect(tbody).toHaveLength(1);

    const row = tbody.find('tr');
    expect(row).toHaveLength(1);

    const cell = row.find('td');
    expect(cell).toHaveLength(1);

    expect(cell.prop('colSpan')).toEqual(cols.length + 1);

    expect(cell.text()).toEqual('There is no data in this table');
  });
});

describe('<Table /> shallow rendering tests', () => {
  it('matches the snapshot', () => {
    const tree = shallow(<Table />);
    expect(tree).toMatchSnapshot();
  });
});
