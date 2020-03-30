import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import './styles/profileTrips.scss';

const ProfileTrips = ({ trips }) => (
  <div className="trips">
    <h1 className="trips__title">Recent Trip Requests</h1>
    <table className="trips__table">
      <thead>
        <tr>
          <td>Destination</td>
          <td>Travel Date</td>
          <td>Status</td>
        </tr>
      </thead>
      <tbody>
        {trips ? (
          trips.map(trip => (
            <tr>
              <td>
                {Array.isArray(trip.destination)
                  ? trip.destination.map(destination => destination)
                  : trip.destination}
              </td>
              <td>
                {Array.isArray(trip.travel_date)
                  ? trip.travel_date.map(travelDate => moment(travelDate).format('L'))
                  : moment(trip.travel_date).format('L')}
              </td>
              <td>{trip.status}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3">No trip requests found</td>
          </tr>
        )}
      </tbody>
    </table>
    <Link to="/trip-requests" className="trips__more">
      View more
    </Link>
  </div>
);

ProfileTrips.propTypes = {
  trips: PropTypes.arrayOf(),
};

ProfileTrips.defaultProps = {
  trips: [],
};

export default ProfileTrips;
