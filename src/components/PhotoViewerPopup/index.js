import React, { Component } from 'react';
import { connect } from 'react-redux';
import Gallery from 'react-images-viewer';
// import ScrollBar from 'react-scrollbars-custom';
// import { CSSTransition, SwitchTransition } from 'react-transition-group'
import history from '../../utils/helpers/history'
import './styles.scss';
import closeIcon from '../../assets/images/popup/close-24px.svg'
// import Button from '../Button'
// import LabelInput from './labelInput'
// import { createAccommodation } from '../../store/modules/accomodation/actions';
// import { createRoom } from '../../store/modules/accomodation/roomActions';
// import CreateAccommodationForm from './CreateAccommodationForm';
// import CreateRoomForm from './CreateRoomForm';
import _ from 'lodash'
import LoaderHoc from '../HOC/loader';


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
          bedrooms: 0,
          size: 0,
          room_number: '',
          address: '',
          description: '',
          geoLocation: '',
          files: [],
          urls: [],
          isDragging: false,
          isAddRoom: false,
          transitionTimes: 0,
          viewerIsOpen: false,
          currImg: 0
        };
        // this.initiaState = { ...this.state };
        // this.handleChange = this.handleChange.bind(this);
        // this.handleMultipleChange = this.handleMultipleChange.bind(this);
        // this.removeItem = this.removeItem.bind(this);
        // this.setState = this.setState.bind(this);
        // this.OnChangeDescription = this.OnChangeDescription.bind(this);
    }
    // componentDidUpdate(prevProps) {
    //     if (prevProps.currentAccommodation !== this.props.currentAccommodation) {
    //         return;
    //     }
    //     return;
    // }

    // handleChange = (event) => {
    //     const { name, value } = event.target;
    //     this.setState(() => ({
    //         [name]: value,
    //     }));
    // };

    // async removeItem(name, value) {
    //     const { values } = this.state[name];
    //     const items = await values.filter((word, index) => index !== value);
    //     this.setState({ [name]: { values: items } });
    // }

    // async handleMultipleChange(e) {
    //     const { name, value } = e.target;
    //     await this.setState((prevState) => ({
    //         [name]: {
    //             ...prevState[name],
    //             input: value,
    //         },
    //     }));
    //     const { values } = this.state[name];
    //     if (value !== ',' && value[value.length - 1] == ',') {
    //         var word = value.trim().split(/,\s*/);
    //         await this.setState({
    //             [name]: {
    //                 values: [...values, word[0]],
    //                 input: '',
    //             },
    //         });
    //     } else {
    //         await this.setState({
    //             [name]: {
    //                 values: [...values],
    //                 input: value,
    //             },
    //         });
    //     }
    // }
    // async OnChangeDescription(textObj) {
    //     return await this.setState({ description: textObj })

    // }
    // setTheState = ({ files, urls, isDragging }) => {
    //     this.setState({
    //         ...this.state,
    //         files: files ? files : this.state.files,
    //         urls: urls ? urls : this.state.urls,
    //         isDragging: isDragging ? isDragging : this.state.isDragging,
    //     });
    // };

    // handleSubmitBtn = async (e) => {
    //     e.preventDefault();
    //     const { createAccommodation } = this.props;
    //     await createAccommodation(this.state);
    //     const { accommodation } = this.props.currentAccommodation;
    //     await history.push(`/accommodations/${accommodation.name}`)
    //     this.setState({
    //         ...this.initiaState,
    //         isAddRoom: true,
    //     });
    // };

    // handleAddRoomBtn = async (e) => {
    //     e.preventDefault();
    //     // const { currentAccommodation, createRoom } = this.props;
    //     // await createRoom(this.state, currentAccommodation.accommodation.id)
    //     await this.setState({
    //         transitionTimes: this.state.transitionTimes + 1
    //     })
    //     console.log(this.props.currentRoom)
    // };

    render() {
        const { currentAccommodation } = this.props;

        // const photos = []
        // const array = currentAccommodation.accommodation.image;
        // var len = array.length;
        // for (var i = 0; i < len; i++) {
        //     photos.push({
        //         src: array[i],
        //         width: i % 2 === 0 ? 3 : 4,
        //         height: i % 2 === 0 ? 4 : 3
        //     });
        // }
        return (
            <div>
                    <Gallery
                      imgs={currentAccommodation.accommodation.image}
                      currImg={this.state.currImg}
                      isOpen={this.state.viewerIsOpen}
                      onClickPrev={this.gotoPrevious}
                      onClickNext={this.gotoNext}
                      onClose={this.closeViewer}
                    />
                  </div>
        );
    }
}

const mapStateToProps = (state) => ({
    currentAccommodation: state.currentAccommodation,
    currentRoom: state.currentRoom,
});
// const mapDispatchToProps = (dispatch) => ({
//     createAccommodation: (data) => dispatch(createAccommodation(data)),
//     createRoom: (data, accomodationId) => dispatch(createRoom(data, accomodationId)),
// });

export default connect(mapStateToProps, null)(AccommodationPopup);