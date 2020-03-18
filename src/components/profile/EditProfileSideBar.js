import React, { Component } from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import Avatar from './ProfileAvatar';
import './styles/editProfileSideBar.scss';
import defaultImg from '../../assets/images/download (1).jpeg';

class EditProfileSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      role: '',
      profileImg: null,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { email, role, profileImg } = this.props;
    this.setState({
      email,
      role,
      profileImg,
    });
  }

  handleChange(event) {
    event.persist();
    const { handleChange } = this.props;
    const imageFile = event.target.files[0];
    if (!imageFile) return;
    if (!imageFile.name.match(/\.(jpg|jpeg|png)$/)) {
      swal({
        title: 'Error',
        text: 'Please select valid image.',
        icon: 'error',
        buttons: 'Close',
      });
      return;
    }
    this.setState(() => ({
      profileImg: URL.createObjectURL(imageFile),
    }));
    handleChange(imageFile);
  }

  render() {
    const { email, role, profileImg } = this.state;

    return (
      <div className="sideBar">
        <div className="sideBar__avatar">
          <Avatar src={profileImg || defaultImg} />
        </div>
        <label className="sideBar__change" htmlFor="input-file">
          change profile
          <input
            type="file"
            id="input-file"
            className="sideBar__change___file"
            onChange={this.handleChange}
          />
        </label>
        <p className="sideBar__text">
          <strong>Email: </strong>
          {email}
        </p>
        <p className="sideBar__text">
          <strong>Role: </strong>
          {role}
        </p>
      </div>
    );
  }
}

EditProfileSideBar.propTypes = {
  email: PropTypes.string,
  role: PropTypes.string,
  profileImg: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
};

EditProfileSideBar.defaultProps = {
  email: '',
  role: '',
  profileImg: '',
};

export default EditProfileSideBar;
