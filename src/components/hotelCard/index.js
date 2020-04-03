import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Amenities from '../amenities'
import Button from '../Button'
import FetchText from '../TextArea/FetchText'
import ScrollBar from 'react-scrollbars-custom'
import history from '../../utils/helpers/history'

import { getAccommodation } from '../../store/modules/accomodation/actions';
import { dispatchCurrentAccommodation } from '../../store/modules/accomodation/actions';

import './styles.scss'

class HotelCard extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            accommodations: [],
            data: null,
        };
        this.selectAccommodation = this.selectAccommodation.bind(this);
    }

    async componentDidMount() {
        const { getAccommodations } = this.props;
        await getAccommodations(1, 5);
        console.log(this.props.accommodations)
    }
    async selectAccommodation(accommodation) {
        const { dispatchCurrentAcc } = this.props;
        await dispatchCurrentAcc(accommodation);
        await history.push(`/accommodations/${accommodation.name}`)
    }
    
    render() {
        const { accommodations } = this.props.accommodations
        return (
            <div style={{height: "100%"}}>
                <ScrollBar style={{ height: '100%' }} >
                {accommodations.map((accommodation) => (
                    <div key={accommodation.id} className="hotel_card">
                        <div className="hotel_card_flame">
                            <div className="hotel_card_flame_image_container">
                                <img className="hotel_card_flame_image_container_image"  src={accommodation.image[0]} />
                            </div>
                            <div className="hotel_card_flame_content_container">
                                <div className="hotel_card_flame_content_container_middle">
                                    <div className="hotel_card_flame_content_container_middle_container">
                                        <h2 className="hotel_card_flame_content_container_middle_container_header">{accommodation.name}<span></span></h2>
                                        <div className="hotel_card_flame_content_container_middle_container_amenities">
                                            <div className="hotel_overview_card_flame_top_left_amenities">
                                                <Amenities accAmenities={accommodation.amenities} amenityNumber={2} setTheState={() => this.setTheState} />

                                            </div>
                                            <div className="hotel_card_flame_content_container_middle_container_amenities_container">
                                                <div className="hotel_card_flame_content_container_middle_container_amenities_container_third">
                                                    <div className="hotel_card_flame_content_container_middle_container_amenities_container_first_text">
                                                        +48 more amenities
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="hotel_card_flame_content_container_middle_container_description">
                                            <FetchText description={accommodation.description} charCount={100} />
                                        </div>
                                    </div>
                                </div>
                                <div className="hotel_card_flame_content_container_right">
                                    {/* cfgvhbjnkml,,cgvhbjnm,fgfhj */}
                                    <Button className="btn" onClick={() => this.selectAccommodation(accommodation)} type="submit" value="Select" />
                                    {/* <Button onClick={()=>this.selectAccommodation(accommodation)}>select</Button> */}

                                </div>

                            </div>
                        </div>
                    </div>
                ))}
                </ScrollBar>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    accommodations: state.allAccommodations,
});
const mapDispatchToProps = (dispatch) => ({
    getAccommodations: (page, limit) => dispatch(getAccommodation(page, limit)),
    dispatchCurrentAcc: (data) => dispatch(dispatchCurrentAccommodation(data)),

});

export default connect(mapStateToProps, mapDispatchToProps)(HotelCard);
