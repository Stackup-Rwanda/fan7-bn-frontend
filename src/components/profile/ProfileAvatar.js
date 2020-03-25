import React from 'react';
import PropTypes from 'prop-types';
import './styles/profileAvatar.scss';
import profileImg from '../../assets/images/download (1).jpeg';

const ProfileAvatar = ({ src }) => (
  <img className="avatar" src={src} alt="Profile Avatar" />
);

ProfileAvatar.propTypes = {
  src: PropTypes.string,
};

ProfileAvatar.defaultProps = {
  src: profileImg,
};

export default ProfileAvatar;
