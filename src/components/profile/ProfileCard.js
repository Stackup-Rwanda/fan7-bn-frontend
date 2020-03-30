import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Avatar from './ProfileAvatar';
import Menu from './ProfileCardMenu';
import './styles/profileCard.scss';
import defaultImg from '../../assets/icons/icons8-customer-48.png';

const ProfileCard = ({
  fullName, userName, profileImg, handleNavigation,
}) => (
  <div className="profile_card">
    <Avatar src={profileImg || defaultImg} />
    <div className="profile_card__text">
      <h1 className="profile_card__text___fullname">{fullName}</h1>
      <p className="profile_card__text___username">
        @
        {userName}
      </p>
    </div>
    <Link className="profile_card__settings" to="/edit-profile">
      <p className="profile_card__settings___edit">Edit Profile</p>
      <span className="profile_card__settings___icon" />
    </Link>
    <div className="profile_card__menu">
      <Menu handleNavigation={handleNavigation} />
    </div>
  </div>
);

ProfileCard.propTypes = {
  fullName: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  profileImg: PropTypes.string.isRequired,
  handleNavigation: PropTypes.func.isRequired,
};

export default ProfileCard;
