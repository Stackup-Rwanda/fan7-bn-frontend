import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from '../../components/Navbar';
import AccommodationsCard from '../../components/AccommodationsCard';
import Button from '../../components/Button';
import Spinner from '../../components/Spinner';
import {
  getAllAccommodations,
  filterAccommodations,
} from '../../store/modules/accommodation/actions';
import { selectLoading, selectAccommodations } from '../../store/modules/accommodation/selectors';
import './Accommodations.scss';

class Accommodations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: null,
    };

    this.handleDestination = this.handleDestination.bind(this);
    this.filterAccommodations = this.filterAccommodations.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getAllAccommodations());
  }

  handleDestination(event) {
    const { value } = event.target;

    this.setState({ address: value });
  }

  filterAccommodations(event) {
    event.preventDefault();

    const { address } = this.state;
    const { dispatch } = this.props;

    dispatch(filterAccommodations(address));
  }

  render() {
    const { loading, accommodations } = this.props;
    console.log(accommodations);

    return (
      <div className="accommodations">
        <Navbar />
        <div className="accommodations__hero">
          <div className="accommodations__form">
            <form className="booking-form" onSubmit={this.filterAccommodations}>
              <div className="booking-form__group">
                <label className="booking-form__label">Location: </label>
                <select
                  type="text"
                  placeholder="Rwanda-Kigali"
                  className="booking-form__control"
                  onChange={this.handleDestination}
                >
                  <option selected disabled>
                    Select Destination
                  </option>
                  <option value="rwanda, kigali">Rwanda-Kigali</option>
                  <option value="burundi, bujumbura">Burundi-Bujumbura</option>
                  <option value="kenya, nairobi">Kenya-Nairobi</option>
                  <option value="nigeria, lagos">Nigeria-Lagos</option>
                </select>
              </div>
              <div className="booking-form__group">
                <Button type="submit" value="Find" className="btn booking-form__btn" />
              </div>
            </form>
          </div>
        </div>
        <div className="accommodations__list">
          {loading ? (
            <Spinner />
          ) : accommodations && accommodations.length > 0 ? (
            accommodations.map((accommodation) => (
              <AccommodationsCard accommodation={accommodation} />
            ))
          ) : (
            <p>No accommodation found</p>
          )}
        </div>
      </div>
    );
  }
}

Accommodations.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  accommodations: PropTypes.arrayOf().isRequired,
};

const select = ({ accommodation }) => ({
  loading: selectLoading(accommodation),
  accommodations: selectAccommodations(accommodation),
});

export default connect(select)(Accommodations);
