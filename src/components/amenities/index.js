
import React, { Component } from 'react'
import wifiIcon from '../../assets/icons/icons8-wi-fi-48.png'
import coffeeIcon from '../../assets/icons/icons8-cafe-50.png'
import AirCondIcon from '../../assets/icons/icons8-air-conditioner-64.png'
import defaultIcon from '../../assets/icons/Medical_Sign-512.png'



const Amenity = ({
    amenityNumber,
    accAmenities,
    setTheState
})=> {
    var iconWithAmenities = [];

    function AddIcon(aminityArray) {
        aminityArray.forEach(name => {

            getIcon(name.toLowerCase());
            function getIcon(a) {
                var lookUpAmenities = {
                    'free wifi': function () {
                        return iconWithAmenities.push({ name: name, icon: wifiIcon });
                    },
                    'free breakfast': function () {
                        return iconWithAmenities.push({ name: name, icon: coffeeIcon });
                    },
                    'air conditioning': function () {
                        return iconWithAmenities.push({ name: name, icon: AirCondIcon });
                    },
                    'default': function () {
                        return iconWithAmenities.push({ name: name, icon: defaultIcon });
                    }
                };
                return (lookUpAmenities[a] || lookUpAmenities['default'])();
            }

        })
        return iconWithAmenities;
    }
    // setTheState(allAmenities.length - 4);
        return (
            <div className="hotel_card_flame_content_container_middle_container_amenities">
                    {AddIcon(accAmenities).slice(0, amenityNumber).map((amenity, index)=> {
                          return  (<div key={index} className="hotel_card_flame_content_container_middle_container_amenities_container">
                                <div className="hotel_card_flame_content_container_middle_container_amenities_container_first">
                                    <div className="hotel_card_flame_content_container_middle_container_amenities_container_first_image">
                                        <img className="hoteCard_icon" src={amenity.icon} />
                                    </div>
                                    <div className="hotel_card_flame_content_container_middle_container_amenities_container_first_text">
                                        {amenity.name}
                                    </div>

                                </div>
                            </div>
                    )})}
                </div>
        )
    }

export default Amenity;

