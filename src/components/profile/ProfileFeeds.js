import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './styles/profileFeeds.scss';

class ProfileFeeds extends Component {
  render() {
    const { gender, dob, address } = this.props;

    return (
      <div className="feeds">
        <div className="feeds-card1">
          <h1 className="feeds-card1__title">Intro</h1>
          <div className="feeds-card1__content">
            {!gender && <span className="feeds-card1__content___icon" />}
            <p className="feeds-card1__content___text">
              {gender ? `Gender: ${gender}` : 'Gender'}
            </p>
          </div>
          <div className="feeds-card1__content">
            {!dob && <span className="feeds-card1__content___icon" />}
            <p className="feeds-card1__content___text">
              {dob ? `Birthday: ${moment(dob).format('L')}` : 'Birthday'}
            </p>
          </div>
          <div className="feeds-card1__content">
            {!address && <span className="feeds-card1__content___icon" />}
            <p className="feeds-card1__content___text">
              {address ? `Location: ${address}` : 'Current location'}
            </p>
          </div>
        </div>
        <div className="feeds-card2">
          <h1 className="feeds-card2__title">Fill Out Your Profile</h1>
          <p className="feeds-card2__desc">
            Add photos and info to your profile so people can find you easily and get to know you
            better!
          </p>
        </div>
      </div>
    );
  }
}

ProfileFeeds.propTypes = {
  gender: PropTypes.string.isRequired,
  dob: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
};

export default ProfileFeeds;
