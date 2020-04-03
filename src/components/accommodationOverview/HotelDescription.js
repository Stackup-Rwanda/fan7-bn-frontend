import React, { Component } from 'react'
import axios from 'axios'
import Map from '../Map'
import 'leaflet/dist/leaflet.css';
import serena from '../../assets/images/42129518.jpg'
import ScrollBar from 'react-scrollbars-custom'
import Amenities from '../amenities'
import FetchText from '../TextArea/FetchText'
import './hotelDescriptionStyle.scss'

class HotelDescription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            remainingAmenities: 0,
        }
        this.setTheState = this.setTheState.bind(this)
    }
    setTheState = async (number) => {
        console.log(number)
        await this.setState({
            remainingAmenities: number
        })
    }
    
    render() {
        // let allAmenities;
        // const allAmenities = ['Free wifi', 'free breakfast', 'free tv', 'free magazine', 'karaoke']
        const { currentAccommodation } = this.props;
        const { accommodation } = currentAccommodation;
        return (
            // <ScrollBar style={{ height: '100%' }}>
                <div className="hotel_description_card">
                    <div className="hotel_description_card_left">
                        <div className="hotel_description_card_left_top">
                            <div className="hotel_description_card_left_top_title">
                                {accommodation.name}
                            </div>
                            <p className="hotel_description_card_left_middle_body">{accommodation.address}</p>
                        </div>
                    <ScrollBar style={{ height: '80%' }}>

                        <div className="hotel_description_card_left_bottom">
                            <div className="hotel_description_card_left_bottom_title">Description</div>
                            <div className="hotel_description_card_left_bottom_body">
                            

                                    <FetchText description={accommodation.description} charCount={100} />

                            </div>

                        </div>
                    </ScrollBar>

                    </div>
                    <div className="hotel_description_card_right">
                        <div className="hotel_description_card_right_container">
                            <div id="mapid" className="hotel_description_card_right_container_map">
                            <Map coordinates={accommodation.geo_location} />
                            </div>
                        </div>
                    </div>
                </div>
            // </ScrollBar>
        )
    }
}

export default HotelDescription;