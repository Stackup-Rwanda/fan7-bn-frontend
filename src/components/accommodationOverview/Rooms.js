import React, { Component } from 'react'
import ScrollBar from 'react-scrollbars-custom'
import { connect } from 'react-redux';

import { getAllRooms } from '../../store/modules/accomodation/roomActions';
import { dispatchCurrentAccommodation } from '../../store/modules/accomodation/roomActions';

import Amenities from '../amenities'
import room from '../../assets/images/rooms-republic.jpg'
import './roomStyle.scss'

class Rooms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            remainingAmenities: 0,
        }
        this.setTheState = this.setTheState.bind(this)
    }

    async componentDidMount() {
        const { currentAccommodation, getRooms } = this.props;
        console.log(currentAccommodation)
        await getRooms(1, 8, currentAccommodation.accommodation.id)
    }
    setTheState = async (number) => {
        console.log(number)
        await this.setState({
            remainingAmenities: number
        })
    }
    render() {
        // const allAmenities = ['Free wifi', 'free breakfast', 'free tv', 'free magazine', 'karaoke']
        const { rooms } = this.props.allAccommodationRooms;
        return (
            <ScrollBar style={{ height: '100%' }}>
                <div className="hotel_overview_card">
                    <div>
                        Those are the rooms
                    </div>
                    <div className="hotel_overview_card_room_container">
                        <div className="hotel_overview_card_room_container_inner">
                            {(rooms.length > 0) ? (rooms.map((room)=>(
                                <div key={room.id} className="hotel_overview_card_room_container_inner_card">
                                    <div className="hotel_overview_card_room_container_inner_card_image">
                                        <img className="hotel_overview_card_room_container_inner_card_image_image1" src={room.image[0]} />
                                    </div>
                                    <div className="hotel_overview_card_room_container_inner_card_right">
                                        <div className="hotel_overview_card_room_container_inner_card_right_type">
                                            <div className="hotel_overview_card_room_container_inner_card_right_type_content">
                                                {room.type}
                                        </div>
                                        </div>
                                        <div className="hotel_overview_card_room_container_inner_card_right_amenities">
                                            <Amenities accAmenities={room.amenities} amenityNumber={3} setTheState={() => this.setTheState.bind(this)} />
                                        </div>
                                        <div className="hotel_overview_card_room_container_inner_card_right_price">
                                            <div className="hotel_overview_card_room_container_inner_card_right_price_container">
                                                <div className="hotel_overview_card_room_container_inner_card_right_price_container_content">
                                                    $ {room.cost}
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))):(<div>
                                No rooms available yet
                            </div>)
                        }
                            
                            {/* <div className="hotel_overview_card_room_container_inner_card">

                            </div>
                            <div className="hotel_overview_card_room_container_inner_card">

                            </div>
                            <div className="hotel_overview_card_room_container_inner_card">

                            </div>
                            <div className="hotel_overview_card_room_container_inner_card">

                            </div> */}
                        </div>
                    </div>
                </div>
                
            </ScrollBar>
        )
    }
}

const mapStateToProps = (state) => ({
    allAccommodationRooms: state.allAccommodationRooms,
});
const mapDispatchToProps = (dispatch) => ({
    getRooms: (page, limit, accomodationId) => dispatch(getAllRooms(page, limit, accomodationId)),
    dispatchCurrentAcc: (data) => dispatch(dispatchCurrentAccommodation(data)),

});

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);
