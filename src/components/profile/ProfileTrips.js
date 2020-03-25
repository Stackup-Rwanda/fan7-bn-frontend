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
          <td> Travel Date</td>
          <td> Status</td>
        </tr>
      </thead>
      <tbody>
        {trips
          ? trips.map((trip) => (
            <tr>
              <td>{trip.destination.map((destination) => destination)}</td>
              <td>{trip.travel_date.map((travelDate) => moment(travelDate).format('L'))}</td>
              <td>{trip.status}</td>
            </tr>
          ))
          : (
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
  trips: PropTypes.arrayOf().isRequired,
};

export default ProfileTrips;
