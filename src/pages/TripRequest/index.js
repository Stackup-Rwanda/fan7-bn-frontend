import React, { Component } from 'react';
import _ from 'lodash';
import DynamicDashboard from '../../components/DynamicDashboard/Dashboard';
import profileImg from '../../assets/images/icons8-user-30.png';
import './TripRequest.scss';
import Button from '../../components/Button';
import InputField from '../../components/InputField';
import { connect } from 'react-redux';
import { getUser, getRequests } from '../../utils/helpers/authHelper';
import Spinner from '../../components/Spinner';
import ServerSidePagination from '../../components/ServerPagination/ServerSidePagination';
import { requesterDashboard } from '../../assets/sidebar';

class TripRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: [],
    };
    this.onChangePage = this.onChangePage.bind(this);
  }

  componentDidMount() {
    this.props.getUserData();  
    this.props.getUserRequests(1, 5);  
  }
  onChangePage = (page, limit) => {
    this.props.getUserRequests(page, limit);  
  };
  render() {
    const photo = this.props.user.image !== null ? this.props.user.image : profileImg;
    const requests = this.props.requests.rows;
    const data = !!requests ? requests.map((req) => 
    <tr>
      <td>{req.id}</td>
      <td>{req.passportName}</td>
      <td>{req.origin}</td>
      <td>{req.destination[0]}</td>
      <td>{req.reason}</td>
      <td>{req.travel_date[0]}</td>
      <td>{req.return_date}</td>
    </tr>    
    ) : <h4> No requests found </h4>;

    const body = this.props.message !== null ? 
    <div className="sub-container">
      <div className="mainButton">
        <Button
          type="submit"
          className="btn buton"
          value=" + Create Trip Request"
        />
      </div>
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
      <div className="mainTable">
        {/*  Table goes here */}
        <table className="body_display_table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Passport Name</th>
              <th>Origin</th>
              <th>Destination</th>
              <th>Reason</th>
              <th>Travel Date</th>
              <th>Return Date</th>
            </tr>
          </thead>
          <tbody>
            {data}
          </tbody>
        </table>
        
        {/* Table ends here */}
      <div>
  {/* Pagination */}
      <ServerSidePagination
      handleChangePage={this.onChangePage}
      totalRows={this.props.requests.count}
      />
  {/* Pagination end */}
      </div>

      </div>

    </div>
  
     : <div> <Spinner /> </div>
    return (
      <div className="big-container">
        <DynamicDashboard
        properties={requesterDashboard}
        profile={photo}
        />

        {body}
        
      </div>
    )
  }
}
const mapState = ({ social, requests }) => ({
  isAuthenticated: social.isAuthenticated,
  user: social.user,
  requests: requests.requests,
  message: requests.message,
});
export default connect(mapState, {
  getUserData: getUser,
  getUserRequests: getRequests,
})(TripRequest);
