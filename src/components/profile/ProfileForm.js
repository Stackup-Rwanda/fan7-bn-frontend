import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './styles/profileForm.scss';

class ProfileForm extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      user: null,
    };
    this.state = this.initialState;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { updateProfile } = this.props;
    const { user } = this.state;
    updateProfile(user);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState(prevState => ({
      user: {
        ...prevState.user,
        [name]: value,
      },
    }));
  }

  render() {
    const { profile, loading } = this.props;
    const {
      first_name: firstName,
      last_name: lastName,
      user_name: userName,
      gender,
      dob,
      phone,
      address,
      country,
      prefered_language: preferedLanguage,
      prefered_currency: preferdCurrency,
      company,
      department,
    } = profile;

    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <div className="form_header">
          <h1 className="form_header__title">Basic info</h1>
          <div className="form_header__buttons">
            <button type="button" className="form_header__buttons___button button_white">
              Cancel
            </button>
            <button type="submit" className="form_header__buttons___button button_blue">
              {loading ? 'Updating...' : 'Update'}
            </button>
          </div>
        </div>
        <div className="form_content">
          <div className="form_content__inputField">
            <label htmlFor="first_name">
              <span className="form_content__inputField___label">FIRST NAME</span>
              <input
                type="text"
                className="form_content__inputField___input"
                name="first_name"
                defaultValue={firstName}
                placeholder="Enter your first name"
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div className="form_content__inputField">
            <label htmlFor="last_name">
              <span className="form_content__inputField___label">LAST NAME</span>
              <input
                type="text"
                className="form_content__inputField___input"
                name="last_name"
                defaultValue={lastName}
                placeholder="Enter your last name"
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div className="form_content__inputField">
            <label htmlFor="user_name">
              <span className="form_content__inputField___label">USERNAME</span>
              <input
                type="text"
                className="form_content__inputField___input"
                name="user_name"
                defaultValue={userName}
                placeholder="Enter your user name"
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div className="form_content__inputField">
            <label htmlFor="gender">
              <span className="form_content__inputField___label">GENDER</span>
              <div className="form_content__inputField__select">
                <select
                  className="form_content__inputField___input"
                  name="gender"
                  defaultValue={gender}
                  onChange={this.handleChange}
                >
                  <option disabled selected className="placeholder">
                    Select your gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </label>
          </div>
          <div className="form_content__inputField">
            <label htmlFor="dob">
              <span className="form_content__inputField___label">DATE OF BIRTH</span>
              <input
                type="date"
                className="form_content__inputField___input"
                name="dob"
                defaultValue={moment(dob).format('YYYY-MM-DD')}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div className="form_content__inputField">
            <label htmlFor="phone">
              <span className="form_content__inputField___label">PHONE</span>
              <input
                type="text"
                className="form_content__inputField___input"
                name="phone"
                defaultValue={phone}
                placeholder="Enter your Phone number"
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div className="form_content__inputField">
            <label htmlFor="address">
              <span className="form_content__inputField___label">ADDRESS</span>
              <input
                type="text"
                className="form_content__inputField___input"
                name="address"
                defaultValue={address}
                placeholder="Enter your current address"
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div className="form_content__inputField">
            <label htmlFor="country">
              <span className="form_content__inputField___label">COUNTRY</span>
              <input
                type="text"
                className="form_content__inputField___input"
                name="country"
                defaultValue={country}
                placeholder="Enter your country"
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div className="form_content__inputField">
            <label htmlFor="prefered_language">
              <span className="form_content__inputField___label">PREFERED LANGUAGE</span>
              <input
                type="text"
                className="form_content__inputField___input"
                name="prefered_language"
                defaultValue={preferedLanguage}
                placeholder="Enter your prefered language"
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div className="form_content__inputField">
            <label htmlFor="prefered_currency">
              <span className="form_content__inputField___label">PREFERED CURRENCY</span>
              <input
                type="text"
                className="form_content__inputField___input"
                name="prefered_currency"
                defaultValue={preferdCurrency}
                placeholder="Enter your prefered currency"
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div className="form_content__inputField">
            <label htmlFor="company">
              <span className="form_content__inputField___label">COMPANY</span>
              <input
                type="text"
                className="form_content__inputField___input"
                name="company"
                defaultValue={company}
                placeholder="Enter your company"
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div className="form_content__inputField">
            <label htmlFor="department">
              <span className="form_content__inputField___label">DEPARTMENT</span>
              <input
                type="text"
                className="form_content__inputField___input"
                name="department"
                defaultValue={department}
                placeholder="Enter your department"
                onChange={this.handleChange}
              />
            </label>
          </div>
        </div>
      </form>
    );
  }
}

ProfileForm.propTypes = {
  updateProfile: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  profile: PropTypes.objectOf(PropTypes.any),
};

ProfileForm.defaultProps = {
  loading: false,
  profile: {},
};

export default ProfileForm;
