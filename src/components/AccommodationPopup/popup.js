import React, { Component } from 'react';
import { connect } from 'react-redux';
import ScrollBar from 'react-scrollbars-custom';
import { CSSTransition, SwitchTransition} from 'react-transition-group'
import history from '../../utils/helpers/history'
import './styles.scss';
import closeIcon from '../../assets/images/popup/close-24px.svg'
import Button from '../Button'
import LabelInput from './labelInput'
import { createAccommodation } from '../../store/modules/accomodation/actions';
import { createRoom } from '../../store/modules/accomodation/roomActions';
import CreateAccommodationForm from './CreateAccommodationForm';
import CreateRoomForm from './CreateRoomForm';
import _ from 'lodash'
import LoaderHoc from '../HOC/loader';
import FormHandleError from './formErrorHandle';


class AccommodationPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      services: {
        values: [],
        input: '',
      },
      amenities: {
        values: [],
        input: '',
      },
      name: '',
      type: '',
      cost: '',
      bedrooms: '',
      size: '',
      room_number: '',
      address: '',
      description: '',
      geoLocation: '',
      files: [],
      urls: [],
      error: {},
      isDragging: false,
      isAddRoom: false,
      transitionTimes: 0
    };
    this.initiaState = { ...this.state };
    this.handleChange = this.handleChange.bind(this);
    this.handleMultipleChange = this.handleMultipleChange.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.setState = this.setState.bind(this);
    this.OnChangeDescription = this.OnChangeDescription.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.currentAccommodation !== this.props.currentAccommodation) {
      return;
    }
    return;
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState(() => ({
      [name]: value,
    }));
  };

  async removeItem(name, value) {
    const { values } = this.state[name];
    const items = await values.filter((word, index) => index !== value);
    this.setState({ [name]: { values: items } });
  }

  async handleMultipleChange(e) {
    const { name, value } = e.target;
    await this.setState((prevState) => ({
      [name]: {
        ...prevState[name],
        input: value,
      },
    }));
    const { values } = this.state[name];
    if (value !== ',' && value[value.length - 1] == ',') {
      var word = value.trim().split(/,\s*/);
      await this.setState({
        [name]: {
          values: [...values, word[0]],
          input: '',
        },
      });
    } else {
      await this.setState({
        [name]: {
          values: [...values],
          input: value,
        },
      });
    }
  }
  async OnChangeDescription(textObj){
    return await this.setState({description: textObj})
    
  }
  setTheState = ({ files, urls, isDragging, errors }) => {
    this.setState({
      ...this.state,
      files: files ? files : this.state.files,
      urls: urls ? urls : this.state.urls,
      isDragging: isDragging ? isDragging : this.state.isDragging,
      error: errors ? errors : this.state.error,
    });
  };

  handleSubmitBtn = async (e) => {
    e.preventDefault();
    const { name, address, geoLocation, services, amenities, description, files } = this.state;
    if(await FormHandleError({ name, address, geoLocation, services, amenities, description, files, setTheState: this.setTheState })) {

      const { createAccommodation } = this.props;
      await createAccommodation(this.state);
      const { accommodation, error } = this.props.currentAccommodation;
      if( accommodation !== {} && error === null) {
        await history.push(`/accommodations/${accommodation.name}`)
        this.setState({
          ...this.initiaState,
          isAddRoom: true,
        });
      }
    }
  };

  handleAddRoomBtn = async (e) => {
    e.preventDefault();
    const { type, cost, bedrooms, room_number, size, amenities, files } = this.state;
    if (await FormHandleError({ type, cost, bedrooms, room_number, size, amenities, files, setTheState: this.setTheState })) {

    const { currentAccommodation, createRoom } = this.props;
    await createRoom(this.state, currentAccommodation.accommodation.id)
    const { room, error } = this.props.currentRoom;
    if (room !== {} && error === null) {
      this.props.closePopup
    }

  };
}

  render() {
    // const { isAddRoom } = this.state;
    const { isAddRoom, currentAccommodation, currentRoom } = this.props;
    // console.log(currentAccommodation.accommodation.room_count)
    return (
      <div className="accommodation_popup">
        <div className="accommodation_popup_innerContainer">
          <div className="accommodation_popup_innerContainer_close">
            <div className="accommodation_popup_innerContainer_close_div">
              <img
                src={closeIcon}
                onClick={this.props.closePopup}
                alt="closeIcon"
                className="accommodation_popup_innerContainer_close_closeIcon"
              />
            </div>   
          </div>
          <div className="accommodation_popup_innerContainer_title">
            <div className="accommodation_popup_innerContainer_title_name">
              {(isAddRoom || this.state.isAddRoom)
                ? currentAccommodation.accommodation.room_count == 0
                  ? `Let's now add a room for ${currentAccommodation.accommodation.name}`
                  : `Add a new room for ${currentAccommodation.accommodation.name}`
                : 'Create your accommodation here'}
            </div>
          </div>
          <div disabled={currentAccommodation.isLoading || currentRoom.isLoading} className="accommodation_popup_innerContainer_inputContainer_transition_container">
            <SwitchTransition>
              <CSSTransition
                key={this.state.isAddRoom}
                addEndListener={(node, done) =>
                  node.addEventListener('transitionend', done, false)
                }
                classNames="fade"
              >
                {(isAddRoom || this.state.isAddRoom) === true ? (
                  <cssTransition
                    key={this.state.transitionTimes}
                    addEndListener={(node, done) =>
                      node.addEventListener('transitionend', done, false)
                    }
                    classNames="fade">
                    <CreateRoomForm
                      ScrollBar={ScrollBar}
                      LabelInput={LabelInput}
                      currentState={this.state}
                      handleChange={() => this.handleChange}
                      removeItem={this.removeItem}
                      handleMultipleChange={this.handleMultipleChange}
                      setTheState={this.setTheState}
                      error={this.state.error}
                    />
                  </cssTransition>
                ) : (
                      <CreateAccommodationForm
                        ScrollBar={ScrollBar}
                        LabelInput={LabelInput}
                        currentState={this.state}
                        handleChange={() => this.handleChange}
                        removeItem={this.removeItem}
                        handleMultipleChange={this.handleMultipleChange}
                        setTheState={this.setTheState}
                        OnChangeDescription={this.OnChangeDescription}
                        error={this.state.error}
                  />
                  
                )}
              </CSSTransition>
            </SwitchTransition>
          </div>

          <div disabled={currentAccommodation.isLoading || currentRoom.isLoading} className="accommodation_popup_innerContainer_buttons">
            <div className="btn accommodation_popup_innerContainer_buttons_submit">
              <Button
                type="submit"
                className="btn accommodation_popup_innerContainer_buttons_button"
                value={isAddRoom ? 'Add' : 'Submit'}
                onClick={
                  (isAddRoom || this.state.isAddRoom)
                    ? this.handleAddRoomBtn
                    : this.handleSubmitBtn
                }
              />
            </div>
            <div className="btn accommodation_popup_innerContainer_buttons_cancel">
              <Button
                onClick={this.props.closePopup}
                className="btn accommodation_popup_innerContainer_buttons_button"
                value={(isAddRoom || this.state.isAddRoom) ? 'Later' : 'Cancel'}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentAccommodation: state.currentAccommodation,
  currentRoom: state.currentRoom,
});
const mapDispatchToProps = (dispatch) => ({
  createAccommodation: (data) => dispatch(createAccommodation(data)),
  createRoom: (data, accomodationId) => dispatch(createRoom(data, accomodationId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccommodationPopup);