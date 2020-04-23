import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StarRatingComponent from 'react-star-rating-component';
import img from '../../assets/images/42129518.jpg';
import locationIcon from '../../assets/icons/iconfinder_157_Twitter_Location_Map_5172496.png';
import wifiIcon from '../../assets/icons/icons8-wi-fi-48.png';
import './AccommodationsCard.scss';

const AccommodationsCard = ({ accommodation }) => (
  <div className="accommodationsCard">
    <div className="accommodationsCard__img">
      {!!accommodation.image && <img src={accommodation.image[0]} alt="accommodation image" />}
    </div>
    <div className="accommodationsCard__content">
      <div className="accommodationsCard__header">
        <h1 className="accommodationsCard__header__title">{accommodation.name}</h1>
        <div className="accommodationsCard__header__stars">
          <StarRatingComponent
            name="rate"
            editing={false}
            value={
              accommodation.ratings && accommodation.ratings.length > 0
                ? accommodation.ratings[0].ratings
                : 0
            }
          />
        </div>
      </div>
      <div className="accommodationsCard__location">
        <img src={locationIcon} className="accommodationsCard__location__icon" alt="icon" />
        <span className="accommodationsCard__location__address">{accommodation.address}</span>
      </div>
      <div className="accommodationsCard__amenities">
        {accommodation.amenities &&
          accommodation.amenities.length > 0 &&
          accommodation.amenities.map((amenity) => (
            <div className="accommodationsCard__amenities__content">
              {/* <img src={wifiIcon} className="accommodationsCard__amenities__icon" alt="icon" /> */}
              <span className="accommodationsCard__amenities__text">{amenity}</span>
            </div>
          ))}
      </div>
      <p className="accommodationsCard__desc">{accommodation.description}</p>
    </div>
    <div className="accommodationsCard__right">
      <div className="accommodationsCard__rating">
        <span className="accommodationsCard__rating__text">
          {accommodation.ratings && accommodation.ratings.length > 0
            ? accommodation.ratings[0].ratings >= 4
              ? 'Excellent'
              : 'Good'
            : 'Good'}
        </span>
        <span className="accommodationsCard__rating__review">
          {accommodation.feedbacks && accommodation.feedbacks.length} review(s)
        </span>
        <div className="accommodationsCard__rating__value">
          <span>
            {accommodation.ratings && accommodation.ratings.length > 0
              ? accommodation.ratings[0].ratings
              : 0}
          </span>
          /5
        </div>
      </div>
      <div className="accommodationsCard__price">
        {/* <span className="accommodationsCard__price__amount">USD 430</span>
        <span className="accommodationsCard__price__per">Per night (excl. taxes)</span> */}
        <span className="accommodationsCard__price__space">
          {accommodation.room_count} total rooms
        </span>
      </div>
      <div className="accommodationsCard__button">
        <a
          href={`/accommodations/${accommodation.id}`}
          className="btn accommodationsCard__button__btn"
        >
          select
        </a>
      </div>
    </div>
  </div>
);

AccommodationsCard.propTypes = {
  accommodation: PropTypes.objectOf().isRequired,
};

export default AccommodationsCard;
