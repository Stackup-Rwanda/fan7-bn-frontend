import React from 'react'

const FormErrorHandle = ({
    services,
    amenities,
    name,
    type,
    cost,
    bedrooms,
    size,
    room_number,
    address,
    description,
    geoLocation,
    files,
    urls,
    setTheState
}) =>{

    
        let errors = {};
        let formIsValid = true;

        //Name
        if (name === '') {
            formIsValid = false;
            errors.name = "Cannot be empty";
        }

        //Type
        if (type === '') {
            formIsValid = false;
            errors.type = "Cannot be empty";
        }

        //Cost
        if (cost === '') {
            formIsValid = false;
            errors.cost = "Cannot be empty";
        }

        if (typeof cost !== "undefined" && cost !== "") {
            if (!cost.match(/^[0-9]*$/)) {
                formIsValid = false;
                errors.cost = "Only numbers";
            }
        }

        //Bedrooms
        if (bedrooms === '') {
            formIsValid = false;
            errors.bedrooms = "Cannot be empty";
        }

        if (typeof bedrooms !== "undefined" && bedrooms !== "") {
            if (!bedrooms.match(/^[0-9]*$/)) {
                formIsValid = false;
                errors.bedrooms = "Only numbers";
            }
        }

        //size
        if (size === '') {
            formIsValid = false;
            errors.size = "Cannot be empty";
        }

        if (typeof size !== "undefined" && size !== "") {
            if (!size.match(/^[0-9]*$/)) {
                formIsValid = false;
                errors.size = "Only numbers";
            }
        }

        //room_number
        if (room_number === '') {
            formIsValid = false;
            errors.room_number = "Cannot be empty";
        }

        if (typeof room_number !== "undefined" && room_number !== "") {
            if (!room_number.match(/^[0-9]{4}$/)) {
                formIsValid = false;
                errors.room_number = "exactly 4 numbers";
            }
        }

        //Description
        if (description === '') {
            formIsValid = false;
            errors.description = "Cannot be empty";
        }


        //Address
        if (address === '') {
            formIsValid = false;
            errors.address = "Cannot be empty";
        }

        if (typeof address !== "undefined" && address !== "") {
            if (!address.match(/^[a-zA-Z]+,\s[a-zA-Z]+$/)) {
                formIsValid = false;
                errors.address = '"address" must be in Country, City format';
            }
        }

        //geoLocation
        if (geoLocation === '') {
            formIsValid = false;
            errors.geoLocation = "Cannot be empty";
        }

        if (typeof geoLocation !== "undefined" && geoLocation !== "") {
            if (!geoLocation.match(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/)) {
                formIsValid = false;
                errors.geoLocation = 'must be in latitute, longitude format';
            }
        }

        //Services

        if (typeof services !== "undefined") {
            if ((services.values).length < 2 ) {
                formIsValid = false;
                errors.services = 'must be more than 2 services';
            }
        }
        //Amenities

        if (typeof amenities !== "undefined") {
            if ((amenities.values).length < 2 ) {
                formIsValid = false;
                errors.amenities = 'must be more than 2 amenities';
            }
        }
        
        //Images

        if (typeof files !== "undefined") {
            if ((files).length < 1 ) {
                formIsValid = false;
                errors.files = 'at least 1 image is required';
            }
        }

        setTheState({ errors });
        return formIsValid;
    
}

export default FormErrorHandle;
