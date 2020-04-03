import React, { Component } from 'react'
import ScrollBar from 'react-scrollbars-custom';
import Amenities from '../amenities';
import './ServicesAmenities.scss'

export default class ServicesAmenities extends Component {
    render() {
        const { currentAccommodation } = this.props;
        const { accommodation } = currentAccommodation;
        return (
          <div className="services_amenities_card">
            <div className="services_amenities_card_flame">
              <div className="services_amenities_card_flame_left">
                <ScrollBar style={{ height: '100%' }}>
                  <div className="services_amenities_card_flame_left_amenities">
                    <div className="services_amenities_card_flame_left_amenities_title">
                      Amenities
                    </div>
                    <div className="services_amenities_card_flame_left_amenities_allAmenities">
                      <Amenities
                        accAmenities={accommodation.amenities}
                        amenityNumber={accommodation.amenities.length}
                      />
                    </div>
                  </div>
                </ScrollBar>
              </div>
              <div className="services_amenities_card_flame_right">
                <ScrollBar style={{ height: '100%' }}>
                  <div className="services_amenities_card_flame_right_amenities">
                    <div className="services_amenities_card_flame_right_amenities_title">
                      Services
                    </div>
                    <div className="services_amenities_card_flame_right_amenities_allAmenities">
                      <Amenities
                        accAmenities={accommodation.services}
                        amenityNumber={accommodation.services.length}
                      />
                    </div>
                  </div>
                </ScrollBar>
              </div>
            </div>
          </div>
        );
    }
}
