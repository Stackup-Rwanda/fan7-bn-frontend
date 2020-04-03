import React, { Component } from 'react';
import { matchPath } from 'react-router'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
// import ScrollBar from 'react-scrollbars-custom'
import jwtDecode from 'jwt-decode';
import AccommodationOverview from '../../components/accommodationOverview';
import RequestDropDown from '../../components/RequestDropDown';

import { getAccommodation} from '../../store/modules/accomodation/actions';
import { dispatchCurrentAccommodation } from '../../store/modules/accomodation/roomActions';

import Popup from '../../components/AccommodationPopup/popup';
import AuthService from '../../utils/AuthService';
import './host_supplier.scss';
import DynamicDashboard from '../../components/DynamicDashboard/Dashboard';
import ServerSidePagination from '../../components/ServerPagination/ServerSidePagination';
import { requesterDashboard, hostSupplierDashboard } from '../../assets/sidebar';
import profileImg from '../../assets/images/icons8-user-30.png';
// import InputField from '../../components/InputField';
import Button from '../../components/Button';
import HotelCard from '../../components/hotelCard';
import history from '../../utils/helpers/history'

let currentRow;

class Accommodation extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      showPopup: false,
      accommodations: [],
      data: null,
      isAddRoom: false,
      isActive: 'overview'
    };

    this.state = this.initialState;
    // this.handleAction = this.handleAction.bind(this);
    // this.onChangePage = this.onChangePage.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
    this.setTheState = this.setTheState.bind(this);
    // this.handleNavClick = this.handleNavClick.bind(this);
  }
  backListener(){ return history.listen(async (location, action) => {
    if (action === "POP") {
      await this.setState({
        isActive: 'overview'
      })
    }
  });
}

  async componentDidMount() {
    // const { getAccommodations } = this.props;
    // await getAccommodations(1, 5);
    this.backListener()
  }

  componentWillUnmount() {
    this.backListener();
  }
  



  // handleAction(row, e) {
  //   currentRow = row;
    
  // const ActionList = [
  //   {
  //     "icon": ""
  //   }
  // ];
  //   RequestDropDown.create(row.id).show({
  //     room_id: row.id,
  //     setTheState: this.setTheState
  //   });
  // }
  // async onChangePage(page, limit) {
  //   const { getAccommodations } = this.props;
  //   await getAccommodations(page, limit);
  // }
  async togglePopup() {
    await this.setState({
      showPopup: !this.state.showPopup,
      data: null,
      isAddRoom: false,
    });
  }
  async handleNavClick(name) {

    await this.setState({ isActive: name})
  }

  async setTheState() {
    // console.log(this.state);

    // const { dispatchCurrentAcc } = this.props;
    // await dispatchCurrentAcc(currentRow);
    await this.setState({
      showPopup: !this.state.showPopup,
      isAddRoom: !this.state.isAddRoom,
    });
  }

  AllAmenities = async () =>{
    await this.setState({
      isActive: 'services'
    });
  }

  // handleTripRequestUpdate(data, id) {
  //   const { dispatch } = this.props;
  //   dispatch(editTripRequest(data, id));
  // }

  render() {
    const match = matchPath(this.props.history.location.pathname, {
      path: '/accommodations/:id',
      exact: true,
      strict: false
    })
    const NavList = [
      {name: "overview", value: "overview"},
      { name: "rooms", value: "rooms" },
      { name: "description", value: "hotel description" },
      { name: "services", value: "amenities & services" },
      { name: "reviews", value: "reviews" },
    ]
    const token = AuthService.getToken();
    const { role } = !!token ? jwtDecode(token) : { role: '' };
    const board = role === 'requester' ? requesterDashboard : hostSupplierDashboard;

    const createBtn = (
      <div className={role !== 'host-supplier' ? "not_supplier" :"host-supplier_createButton"}>
        <div className="mainButton">
          {(match && match.isExact === true) ? <Button
            type="submit"
            className="btn buton"
            value=" + Add Room"
            onClick={this.setTheState}
          /> :<Button
            type="submit"
            className="btn buton"
            value=" + Add accommodation"
            onClick={this.togglePopup}
          />}

          {this.state.showPopup ? (
            <Popup
              closePopup={this.togglePopup}
              isAddRoom={this.state.isAddRoom}
            />
          ) : null}
        </div>
        <div className="host-supplier_createButton_main-header">
          {(match && match.isExact === true) ? <div className="host-supplier_createButton_main-header_navigation">
            <div className="host-supplier_createButton_main-header_navigation_container">
              {
                NavList.map(list =>(
                  <div key={list.name} className={this.state.isActive === list.name ? 'host-supplier_createButton_main-header_navigation_container_item is-active' : 'host-supplier_createButton_main-header_navigation_container_item '}>
                    <span className="item_span" onClick={this.handleNavClick.bind(this, list.name)}>{list.value}</span>
                  </div>))
              }
              
              </div>
            </div>
            : <div className="host-supplier_createButton_main-header_allAccommodations">
            <div className="host-supplier_createButton_main-header_allAccommodations_text">
                You have {this.props.accommodations.count} active accommodations
            </div>
          </div>}
        </div>
      </div>
        
      );

    return (
      <div>
        <DynamicDashboard properties={board} profile={profileImg}>
          <div className="host-big-container">
            <div className="host-sub-container">
              {createBtn}

              <div className="sub-container_card-container">
                <Switch>
                  <Route exact path={["/accommodations/:id", "/accommodations"]}>
                    <Route path="/accommodations/:id" render={() => <AccommodationOverview isActive={this.state.isActive} AllAmenities={this.AllAmenities} />} />
                    <Route exact path="/accommodations" render={()=> <HotelCard />} />
                  </Route>
                </Switch>
                
                  
                
              </div>
              {/* <Table
            cols={
              (role === 'host-supplier' && hostSupplierCols) ||
              []
            }
            data={accommodations.accommodations}
            loading={loading}
            actions={true}
            handleAction={this.handleAction}
          /> */}
              {/* Pagination start*/}
              {/* <ServerSidePagination
            handleChangePage={this.onChangePage}
            totalRows={count}
          /> */}
              {/* Pagination end */}
            </div>
          </div>
         
        </DynamicDashboard>
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

const mapStateToProps = (state) => ({
  accommodations: state.allAccommodations,
});
// const mapDispatchToProps = (dispatch) => ({
//   getAccommodations: (page, limit) => dispatch(getAccommodation(page, limit)),
//   dispatchCurrentAcc: (data) => dispatch(dispatchCurrentAccommodation(data)),
  
// });

export default connect(mapStateToProps, null)(Accommodation);
