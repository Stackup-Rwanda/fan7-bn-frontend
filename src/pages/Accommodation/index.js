import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import Navbar from '../../components/Navbar';
import AccommodationCard from '../../components/AccommodationCard';
import RoomCard from '../../components/RoomCard';
import Button from '../../components/Button';
import locationIcon from '../../assets/icons/iconfinder_157_Twitter_Location_Map_5172496.png';
import Spinner from '../../components/Spinner';
import { getSingleAccommodation } from '../../store/modules/accommodation/actions';
import { selectLoading, selectAccommodation } from '../../store/modules/accommodation/selectors';
import { bookRoom } from '../../store/modules/booking/actions';
import { selectBookLoading, selectBookingData } from '../../store/modules/booking/selectors';
import validateBooking from '../../utils/helpers/validateBooking';
import history from '../../utils/helpers/history';
import './Accommodation.scss';

class Accommodation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showBookForm: false,
      roomId: null,
      cost: null,
      checkin: null,
      checkout: null,
      totalCost: 0,
      bookingData: null,
      error: null,
    };

    this.handleBookForm = this.handleBookForm.bind(this);
    this.closeBookForm = this.closeBookForm.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    const { id } = match.params;

    dispatch(getSingleAccommodation(id));
  }

  handleBookForm(room) {
    this.setState((prevState) => ({
      showBookForm: !prevState.showBookForm,
      roomId: room.id,
      cost: room.cost,
    }));
  }

  closeBookForm() {
    this.setState(() => ({
      showBookForm: false,
    }));
  }

  handleDate(event) {
    const { name, value } = event.target;
    const { checkin, checkout } = this.state;
    const error = validateBooking(event, checkin, checkout);

    if (!!error) {
      this.setState(() => ({
        error,
        [name]: null,
      }));
    } else {
      this.setState(() => ({
        [name]: value,
      }));
    }
  }

  async handleSubmit(event) {
    event.preventDefault();

    const { checkin, checkout, roomId, error } = this.state;

    if (!!error) {
      return;
    }

    if (!!checkin && !!checkout) {
      const { dispatch, match } = this.props;
      const { id } = match.params;

      await dispatch(
        bookRoom(
          moment(checkin).format('YYYY-MM-DD'),
          moment(checkout).format('YYYY-MM-DD'),
          roomId,
          id
        )
      );

      const { bookingData } = this.props;
      this.setState(() => ({
        showBookForm: false,
        bookingData,
      }));

      await dispatch(getSingleAccommodation(id));

      history.push(`/accommodations/${id}`);
    } else {
      this.setState(() => ({
        error: 'Check In and Check Out date must be provided',
      }));
    }
  }

  render() {
    const { loading, accommodation, bookLoading, bookingData } = this.props;
    const { showBookForm, error, totalCost } = this.state;

    return (
      <div className="accommodation">
        <Navbar />
        <div className="accommodation__hero">
          {!!accommodation && (
            <div className="accommodation__hero__content">
              <h1 className="accommodation__title">{accommodation.name}</h1>
              <div className="accommodation__location">
                <img src={locationIcon} className="accommodation__location__icon" alt="icon" />
                <span className="accommodation__location__address">{accommodation.address}</span>
              </div>
            </div>
          )}
        </div>
        {showBookForm && (
          <div className="accommodation__modal">
            <div className="accommodation__form">
              <span className="accommodation__form__close" onClick={this.closeBookForm}>
                &#215;
              </span>
              <form className="accommodation__booking-form" onSubmit={this.handleSubmit}>
                <div className="accommodation__booking-form__group">
                  <label className="accommodation__booking-form__label">Checkin</label>
                  <input
                    type="date"
                    placeholder="Rwanda-Kigali"
                    className="accommodation__booking-form__control"
                    name="checkin"
                    onChange={this.handleDate}
                  />
                </div>
                <div className="accommodation__booking-form__group">
                  <label className="accommodation__booking-form__label">Checkout</label>
                  <input
                    type="date"
                    placeholder="Rwanda-Kigali"
                    className="accommodation__booking-form__control"
                    name="checkout"
                    onChange={this.handleDate}
                  />
                </div>
                <div className="accommodation__booking-form__group">
                  {!!error && <span className="accommodation__booking-form__error">{error}</span>}
                </div>
                <div className="accommodation__booking-form__group">
                  <Button
                    type="submit"
                    value={bookLoading ? 'Booking...' : 'Book'}
                    className="btn accommodation__booking-form__btn"
                    name="submit"
                  />
                </div>
              </form>
            </div>
          </div>
        )}
        {!!accommodation && (
          <div className="accommodation__card">
            <AccommodationCard accommodation={accommodation} />
          </div>
        )}
        {accommodation && <div className="accommodation__header">Choose a room</div>}
        {accommodation && (
          <div className="accommodation__contents">
            <div className="accommodation__contents__header">
              <span className="accommodation__contents__type">Rooms</span>
              {/* <span className="accommodation__contents__price">RWF 247,000/night</span> */}
            </div>
            <div className="accommodation__contents__list">
              {accommodation.rooms && accommodation.rooms.length > 0 ? (
                accommodation.rooms.map((room) => (
                  <RoomCard room={room} handleBookForm={this.handleBookForm} />
                ))
              ) : (
                <span>No rooms found</span>
              )}
            </div>
          </div>
        )}
        {!!accommodation && accommodation.feedbacks && accommodation.feedbacks.length > 0 && (
          <div className="accommodation__contents" id="reviews">
            <div className="accommodation__contents__header">
              <span className="accommodation__contents__type">Reviews</span>
              {/* <span className="accommodation__contents__price">RWF 247,000/night</span> */}
            </div>
            <div className="accommodation__contents__list">
              {accommodation.feedbacks.map((feedback) => (
                <p>{feedback.feedback}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

Accommodation.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  accommodation: PropTypes.objectOf().isRequired,
  bookLoading: PropTypes.bool.isRequired,
  bookingData: PropTypes.objectOf().isRequired,
};

const select = ({ accommodation, booking }) => ({
  loading: selectLoading(accommodation),
  accommodation: selectAccommodation(accommodation),
  bookLoading: selectBookLoading(booking),
  bookingData: selectBookingData(booking),
});

export default connect(select)(Accommodation);
