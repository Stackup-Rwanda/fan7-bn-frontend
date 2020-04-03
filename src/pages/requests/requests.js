import React, { Component } from 'react';
import './Request.scss';
import Popup from '../../components/popup/popup'
import Table from '../../components/requests/requestTable';
import Button from '../../components/Button';
import { connect } from 'react-redux';
import {
  create_one_way_trip,
  create_return_trip,
  create_multi_city_trip,
  get_requests,
  editTripRequest

} from '../../store/modules/requests/userRequests/actions';

class CreateRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  componentDidMount() {
    this.props.fetchRequests()

  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
      data: null
    });
  }
  toggleEditPopup(data) {
    this.setState({
      showPopup: !this.state.showPopup,
      data
    });
  }
  handleTripRequestUpdate(data, id) {
    this.props.updateTripRequest(data, id)
  }

  render() {

    return (
      <div className="reqContainer">
        <div className="reqContainer_sidebar"></div>
        <div className="reqContainer_navbar"></div>
        <div className="reqContainer_mini-container">
          <hr className="reqContainer_mini-container_line"></hr>
          <div className="reqContainer_mini-container_search">
            <label className="reqContainer_mini-container_search_page-title">Records Per Page</label>
          </div>
          <hr className="reqContainer_mini-container_line"></hr>
          <div className="reqContainer_mini-container_mainTable">
            <Table
              requests={this.props.requests}
              togglePopup={this.toggleEditPopup.bind(this)}
            />
          </div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ request }) => ({
  requests: request.requests,
  // accommodations: request.accommodations,
  loading: request.loading,
  error: request.error,

})
const mapDispatchToProps = (dispatch) => ({
  oneway(data) {
    dispatch(create_one_way_trip(data))
  },
  returnTrip(data) {
    dispatch(create_return_trip(data))
  },
  multicity(data) {
    dispatch(create_multi_city_trip(data))
  },
  // fetchAccommodations() {
  //   dispatch(get_accommodations())
  // },
  fetchRequests() {
    dispatch(get_requests())
  },
  updateTripRequest(data, id) {
    dispatch(editTripRequest(data, id))
  }

})
export default connect(mapStateToProps, mapDispatchToProps)(CreateRequest);
