import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import Table from '../../components/Table';
import {
  create_one_way_trip,
  create_return_trip,
  create_multi_city_trip,
  get_requests,
  editTripRequest

} from '../../store/modules/requests/userRequests/actions';
import { getTripRequests } from '../../store/modules/request/view/actions';
import {
  selectLoading,
  selectCount,
  selectRequests,
} from '../../store/modules/request/view/selectors';
import Popup from '../../components/popup/popup';
import AuthService from '../../utils/AuthService';
import './Request.scss';
import DynamicDashboard from '../../components/DynamicDashboard/Dashboard';
import ServerSidePagination from '../../components/ServerPagination/ServerSidePagination';
import { requesterDashboard, managerDashboard } from '../../assets/sidebar';
import profileImg from '../../assets/images/icons8-user-30.png';
import InputField from '../../components/InputField';
import Button from '../../components/Button';

class Request extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      showPopup: false,
      requests: [],
      data: null
    };

    this.state = this.initialState;
    this.handleAction = this.handleAction.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getTripRequests(1, 5));
  }

  handleAction(row) {
    console.log(row);
  }
  onChangePage(page, limit) {
    const { dispatch } = this.props;
    dispatch(getTripRequests(page, limit));
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
  oneway(data) {
    const { dispatch } = this.props;
    dispatch(create_one_way_trip(data))
  }
  returnTrip(data) {
    const { dispatch } = this.props;
    dispatch(create_return_trip(data))
  }
  multicity(data) {
    const { dispatch } = this.props;
    dispatch(create_multi_city_trip(data))
  }
  handleTripRequestUpdate(data, id) {
const { dispatch } = this.props;
    dispatch(editTripRequest(data, id))
  }

  render() {
    const managerCols = [
      { header: 'Requester', name: 'requester' },
      { header: 'Trip Reason', name: 'reason' },
      { header: 'Destination(s)', name: 'destination' },
      { header: 'Travel Date', name: 'travel_date' },
      { header: 'Return Date', name: 'returnDate' },
      { header: 'Type', name: 'type' },
      { header: 'Status', name: 'status' },
    ];
    const requesterCols = [
      { header: 'Trip Reason', name: 'reason' },
      { header: 'Destination(s)', name: 'destination' },
      { header: 'Travel Date', name: 'travel_date' },
      { header: 'Return Date', name: 'returnDate' },
      { header: 'Passport Name', name: 'passportName' },
      { header: 'Passport Number', name: 'passportNumber' },
      { header: 'Type', name: 'type' },
      { header: 'Status', name: 'status' },
    ];
    const { loading, count, requests } = this.props;
    const token = AuthService.getToken();
    const { role } = !!token ? jwtDecode(token) : { role: '' };
    const board = role === 'requester' ? requesterDashboard : managerDashboard;
    const createBtn = role === 'requester' ?
      <div className="mainButton">
        <Button
          type="submit"
          className="btn buton"
          value=" + Create Trip Request"
          onClick={this.togglePopup.bind(this)}
        />


        {this.state.showPopup ?
          <Popup
            oneWay={this.oneway.bind(this)}
            returntrip={this.returnTrip.bind(this)}
            multiCity={this.multicity.bind(this)}
            closePopup={this.togglePopup.bind(this)}
            data={this.state.data}
            update={this.handleTripRequestUpdate.bind(this)}
          />
          : null
        }
      </div>
      : <div className="emptyDiv"></div>;

    return (
      <div className="big-container">
        <div className="sub-container">
          {createBtn}
          <hr className="line"></hr>
          <div className="search">
          <label className="page-title">Records per page</label> 
          <div className="search-box">
          <label className="">Search:</label> 
          <InputField
          type="text"
          name="search"
          className="search-input"
          />
          </div>
          </div>
          <hr className="line"></hr>
          <DynamicDashboard
          properties={board}
          profile={profileImg}
          />
          <Table
            cols={(role === 'requester' && requesterCols) || (role === 'manager' && managerCols) || []}
            data={requests}
            loading={loading}
            actions={true}
            handleAction={this.handleAction}
            handleEdit={role === 'requester' && this.toggleEditPopup.bind(this)}
          />
            {/* Pagination start*/}
            <ServerSidePagination
            handleChangePage={this.onChangePage}
            totalRows={count}
            />
            {/* Pagination end */}
          </div>
      </div>
    );
  }
}

Request.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  count: PropTypes.number.isRequired,
  requests: PropTypes.arrayOf().isRequired,
};

const select = ({ viewRequests }) => ({
  loading: selectLoading(viewRequests),
  count: selectCount(viewRequests),
  requests: selectRequests(viewRequests),
});

export default connect(select)(Request);
