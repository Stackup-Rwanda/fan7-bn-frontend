import React from 'react';
import PropTypes from 'prop-types';
import img from '../../assets/images/42129518.jpg';
import wifiIcon from '../../assets/icons/icons8-wi-fi-48.png';
import Button from '../Button';
import './RoomCard.scss';

const RoomCard = ({ room, handleBookForm }) => (
    <div className="roomCard">
      <div className="roomCard__img">
        <img src={(!!room.image && room.image[0]) || img} alt="accommodation image" />
      </div>
      <div className="roomCard__content">
        <div className="roomCard__price">RWF {room.cost}</div>
        <div className="roomCard__beds">{room.total_bedrooms} bed rooms</div>
        <div className="roomCard__amenities">
          {room.amenities &&
            room.amenities.length > 0 &&
            room.amenities.map((amenity) => (
              <div className="roomCard__amenities__content">
                {/* <img src={wifiIcon} className="roomCard__amenities__icon" alt="icon" /> */}
                <span className="roomCard__amenities__text">{amenity}</span>
              </div>
            ))}
        </div>
        <div className="roomCard__button">
          <Button
            className="btn roomCard__button__btn"
            type="button"
            value={room.booked ? 'Booked' : "Book Now"}
            disabled={room.booked}
            onClick={() => handleBookForm(room)}
          />
        </div>
      </div>
    </div>
  );

RoomCard.propTypes = {
  room: PropTypes.objectOf().isRequired,
  handleBookForm: PropTypes.func.isRequired,
};

export default RoomCard;
