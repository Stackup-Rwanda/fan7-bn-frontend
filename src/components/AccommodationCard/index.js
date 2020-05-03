import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import StarRatingComponent from 'react-star-rating-component';
import img from '../../assets/images/42129518.jpg';
import wifiIcon from '../../assets/icons/icons8-wi-fi-48.png';
import './AccommodationCard.scss';

const Marker = ({ text }) => <div>{text}</div>;

const AccommodationCard = ({ accommodation }) => {
  const latlong = !!accommodation.geo_location ? accommodation.geo_location.split(', ') : [90, 180];
  const center = { lat: parseInt(latlong[0], 10), lng: parseInt(latlong[1], 10) };

  return (
    <div className="accommodationCard">
      <div className="accommodationCard__content">
        {/* <div className="accommodationCard__header">
            <h1 className="accommodationCard__header__title">Mariott</h1>
            <div className="accommodationCard__header__stars">stars</div>
          </div> */}
        <div className="accommodationCard__ratings">
          <div className="accommodationCard__rating">
            <span className="accommodationCard__rating__value">
              {accommodation.ratings && accommodation.ratings.length > 0
                ? accommodation.ratings[0].ratings
                : 0}
            </span>
            <span className="accommodationCard__rating__text">
              {accommodation.ratings && accommodation.ratings.length > 0
                ? accommodation.ratings[0].ratings >= 4
                  ? 'Excellent'
                  : 'Good'
                : 'Good'}
            </span>
            <span className="accommodationCard__rating__stars">
              <StarRatingComponent
                name="rate"
                editing={false}
                value={
                  accommodation.ratings && accommodation.ratings.length > 0
                    ? accommodation.ratings[0].ratings
                    : 0
                }
              />
            </span>
          </div>
          <a className="accommodationCard__ratings__review" href="#reviews">
            {accommodation.feedbacks && accommodation.feedbacks.length} review(s) >
          </a>
        </div>
        <div className="accommodationCard__amenities">
          {accommodation.amenities &&
            accommodation.amenities.length > 0 &&
            accommodation.amenities.map((amenity) => (
              <div className="accommodationCard__amenities__content">
                {/* <img src={wifiIcon} className="accommodationCard__amenities__icon" alt="icon" /> */}
                <span className="accommodationCard__amenities__text">{amenity}</span>
              </div>
            ))}
        </div>
      </div>
      <div className="accommodationCard__map">
        <GoogleMapReact defaultCenter={center} defaultZoom={11} yesIWantToUseGoogleMapApiInternals>
          <Marker
            lat={parseInt(latlong[0], 10)}
            lng={parseInt(latlong[1], 10)}
            text={accommodation.name}
          />
        </GoogleMapReact>
      </div>
      <div className="accommodationCard__img">
        {!!accommodation.image && <img src={accommodation.image[0]} alt="accommodation image" />}
      </div>
      <div className="accommodationCard__desc">
        <h1 className="accommodationCard__desc__title">Description</h1>
        <p className="accommodationCard__desc__content">{accommodation.description}</p>
      </div>
    </div>
  );
};

AccommodationCard.propTypes = {
  accommodation: PropTypes.objectOf().isRequired,
};

export default AccommodationCard;
