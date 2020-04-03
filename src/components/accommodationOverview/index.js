import React from 'react'
import { connect } from 'react-redux';
import Overview from './Overview'
import Rooms from './Rooms'
import HotelDescription from './HotelDescription'
import ServicesAmenities from './ServicesAmenities'

const SingleAccommodation= ({
    isActive,
    currentAccommodation,
    AllAmenities
}) =>{
    
    const TypeOfInput = (
        isActive,
    ) => {
        switch (isActive) {
            case 'overview': {
                return <Overview currentAccommodation={currentAccommodation} AllAmenities={AllAmenities} />;
            }
            case 'rooms': {
                return <Rooms currentAccommodation={currentAccommodation}/>;
            }
            case 'services': {
                return <ServicesAmenities currentAccommodation={currentAccommodation} />
            }
            case 'description': {
                return <HotelDescription currentAccommodation={currentAccommodation} />;
            }
            // case 'reviews': {
            //     return InputTextArea(name, OnChange);
            // }

            default: {
                return ;
            }
        }
    };
    return ( 
        <div style={{ height: "100%" }}>
            {TypeOfInput(isActive)}
        </div>
    )
}
const mapStateToProps = (state) => ({
    currentAccommodation: state.currentAccommodation,
});
// const mapDispatchToProps = (dispatch) => ({
//   getAccommodations: (page, limit) => dispatch(getAccommodation(page, limit)),
//   dispatchCurrentAcc: (data) => dispatch(dispatchCurrentAccommodation(data)),

// });

export default connect(mapStateToProps, null)(SingleAccommodation);
