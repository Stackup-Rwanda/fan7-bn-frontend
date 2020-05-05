import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Spinner from '../../Spinner';
import './ManagerRequestTable.scss';
import options from '../../../assets/icons/icons8-menu-vertical-30.png';

const Table = ({ requests, handleSearch, loading, handleAction }) => {
  return (
    <div className="requests-table">
      <div className="requests-table__header">
        <label htmlFor="search">
          <span>Search:</span>
          <input
            type="text"
            className="requests-table__header___search"
            name="search"
            placeholder="Search..."
            onChange={handleSearch}
          />
        </label>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Requester</th>
            <th>Trip Reason</th>
            <th>Destination(s)</th>
            <th>Travel Date</th>
            <th>Return Date</th>
            <th>Type</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {!!loading ? (<Spinner />) : (!!requests ? (
            requests.map(request => (
              <tr key={request.id}>
                <td>{request.user.email}</td>
                <td>{request.reason}</td>
                <td>
                  {request.destination && request.destination.map(destination => `${destination}  `)}
                </td>
                <td>
                  {request.travel_date &&
                    request.travel_date.map(travelDate => `${moment(travelDate).format('L')}  `)}
                </td>
                <td>{request.return_date ? moment(request.return_date).format('L') : ''}</td>
                <td>{request.type}</td>
                <td>{request.status}</td>
                <td>
                  <button type="button" onClick={handleAction}>
                    <img src={options} alt="more options" data-requestId={request.id} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No trip requests found</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  requets: PropTypes.arrayOf(),
  handleSearch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

Table.defaultProps = {
  requets: [],
  loading: false,
};

export default Table;
