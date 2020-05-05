import React from 'react';
import PropTypes from 'prop-types';
import TableLoader from './TableLoader';
import './styles/Table.scss';
import options from '../../assets/icons/icons8-menu-vertical-30.png';

const renderData = (data, cols, actions, handleAction) =>
  data.map((row) => (
    <tr key={row.id}>
      {!!cols &&
        cols.map((col) => (
          <td key={col.name}>
            {Array.isArray(row[col.name])
              ? row[col.name].map((arr) => (
                  <>
                    {arr}
                    <br />
                  </>
                ))
              : row[col.name]}
          </td>
        ))}
      {actions && (
        <td key="actions">
          <div className="dropdown">
            <button
              className="dropbtn"
              type="button"
              id={`table_dots_btn_${row.id}`}
              onClick={(e) => handleAction(row, e)}
            >
              <img src={options} alt="more options" />
            </button>
           </div>
        </td>
      )}
    </tr>
  ));

const renderEmptyState = (cols, actions) => <tr><td colSpan={actions ? cols.length + 1 : cols.length}>There is no data in this table</td></tr>;

const Table = ({ cols, data, loading, actions, handleAction }) => {
  return (
    <div className="data-table">
      <table className="table">
        <thead>
          <tr>
            {cols.map(col => (
              <th key={col.name}>{col.header}</th>
            ))}
            {actions && <th key="actions">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <div className="table-loader"><TableLoader /></div>
          ) : data.length > 0 ? (
            renderData(data, cols, actions, handleAction)
          ) : (
            renderEmptyState(cols, actions)
          )}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  cols: PropTypes.arrayOf(),
  data: PropTypes.arrayOf(),
  loading: PropTypes.bool,
  actions: PropTypes.bool,
  handleAction: PropTypes.func
};

Table.defaultProps = {
  cols: [
    { header: 'ID', name: 'id' },
    { header: 'Name', name: 'name' },
    { header: 'Email', name: 'email' },
    { header: 'Date', name: 'date' },
  ],
  data: [
    { id: 1, name: 'Elvis', email: 'elvisrugamba@example.com', date: ['1997-10-12', '1997-10-12'] },
  ],
  loading: false,
  actions: false,
  handleAction: () => {}
};

export default Table;