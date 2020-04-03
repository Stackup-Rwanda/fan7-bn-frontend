import React, { Component } from 'react';
import './styles.scss';
import moment from 'moment'
import closeIcon from '../../assets/images/popup/close-24px.svg'
import Button from '../Button'
import Input from '../InputField'
import _ from 'lodash'


class Popup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // accommodations: [],
            checked: null,
            isEdit: false,
            id: null,
            numInputs: 1,
            destination: [],
            travelDate: []
        };

    }
    componentDidMount() {
        // const { accommodations } = this.props;
        this.setState({
            id: this.props.data ? this.props.data.id : null,
            isEdit: !!this.props.data,
            checked: this.props.data ? this.props.data.type : null,
            numInputs: (this.props.data && this.props.data.type === 'multiCity') ? this.props.data.destination.length : 1
            // accommodations: this.props.data ? _.filter(accommodations, accommodation => this.props.data.destination.includes(accommodation.address)) : null
        })
    }
    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState(() => ({
            [name]: value,
        }));
        console.log(this.state);

    }
    handleRadioBtn = (event) => {
        const { value } = event.target;
        this.setState(() => ({
            checked: value,
            numInputs: 1
        }));
        if (value === "oneway") {
            this.setState(() => ({
                returnDate: null
            }))
        }
        console.log(this.state);

    }
    handleTravelDate = (i, event) => {
        const { value } = event.target;
        let travelDate = [...this.state.travelDate]
        travelDate[i] = moment(value).format('YYYY-MM-DD')
        this.setState(() => ({
            travelDate
        }));
        console.log(this.state);

    }
    handleDate = (event) => {
        const { name, value } = event.target;
        console.log('return date', value);

        this.setState(() => ({
            [name]: moment(value).format('YYYY-MM-DD'),
        }));
        console.log(this.state);

    }
    handleSubmitBtn = (event) => {
        event.preventDefault();
        const { numInputs, checked, isEdit, id, ...data } = this.state
        if (isEdit) {
            if (this.state.destination.length === 0
                && this.state.travelDate.length === 0) {
                const { destination, travelDate, ...dataToUpdate } = data;
                return this.props.update(dataToUpdate, id);
            }
            if (this.state.destination.length === 0
                && this.state.travelDate.length > 0) {
                const { destination, ...dataToUpdate } = data;
                return this.props.update(dataToUpdate, id);
            }
            if (this.state.destination.length > 0
                && this.state.travelDate.length === 0) {
                const { travelDate, ...dataToUpdate } = data;
                return this.props.update(dataToUpdate, id);
            }
        }
        if (checked === "oneway") {
            data.destination = data.destination[0];
            data.travelDate = data.travelDate[0];
            return this.props.oneWay(data)
        } else if (checked === "multiCity") {
            console.log(this.state.travelDate);

            data.travelDates = data.travelDate;
            const { travelDate, ...multiCityData } = data;
            return this.props.multiCity(multiCityData)


        } else if (checked === "returnTrip") {
            data.destination = data.destination[0];
            data.travelDate = data.travelDate[0];
            return this.props.returntrip(data)
        } else {
            return
        }

    }
    handleDestinations = (i, event) => {
        const { value } = event.target;
        let destination = [...this.state.destination];
        destination[i] = value;
        // const { accommodations } = this.props;
        this.setState(() => ({
            destination,
            // accommodations: _.filter(accommodations, accommodation => accommodation.address === value)
        }));
    }
    // renderAccommodations = () => (
    //     this.state.accommodations
    //         ? this.state.accommodations.map(accommodation => (
    //             <option
    //                 value={accommodation.id}
    //                 selected={this.props.data && this.props.data.destination.includes(accommodation.address)}>
    //                 {accommodation.name}
    //             </option>
    //         ))
    //         : <option disabled selected>No accommodations found</option>
    // )

    // handleKeyPress = (event) => {
    //     const code = event.keyCode || event.which;
    //     if(code === 13) { 

    //     } 

    // }

    incrementInputs = (e) => {
        e.preventDefault();
        this.setState((prevState) => ({
            numInputs: prevState.numInputs + 1
        }))

    }

    renderMultippleInputs = () => {
        console.log(this.state.numInputs);

        const { numInputs } = this.state;
        let inputs = [];
        for (let index = 0; index < numInputs; index++) {
            inputs.push(index + 1)
            console.log('Indexxx', index, 'numInputs', numInputs);
        }

        return inputs.map((input, i) => (
            <>
                <div className="popup_innerContainer_inputContainer_text">
                    <label className="popup_innerContainer_inputContainer_text_texts">Destination(s)</label></div>
                <div className="popup_innerContainer_inputContainer_div1"><Input
                    type="text"
                    name="destination"
                    id="destination"
                    defaultValue={this.props.data && this.props.data.destination[i]}
                    className="input inputs"
                    onChange={this.handleDestinations.bind(this, i)}
                /></div>
                <div className="popup_innerContainer_inputContainer_text">
                    <label className="popup_innerContainer_inputContainer_text_texts">Travel Date</label></div>
                <div className="popup_innerContainer_inputContainer_div1"><Input
                    type="date"
                    name="travelDate"
                    id="travelDate"
                    defaultValue={this.props.data && moment(this.props.data.travel_date[i]).format('YYYY-MM-DD')}
                    className="input inputs"
                    onChange={this.handleTravelDate.bind(this, i)}
                /></div>
            </>
        )
        )
    }
    render() {
        return (
            <div className="popup">
                <div className="popup_innerContainer">
                    <div className="popup_innerContainer_close">
                        <img
                            src={closeIcon}
                            onClick={this.props.closePopup}
                            alt="closeIcon"
                            className="popup_innerContainer_close_closeIcon" />
                    </div>
                    <div className="popup_innerContainer_radios">
                        <label>
                            <input type="radio"
                                value="oneway"
                                name="oneway"
                                checked={this.state.checked === "oneway"}
                                className="popup_innerContainer_radios_radio"
                                onChange={this.handleRadioBtn} />
            One-way Trip
          </label>
                        <label>
                            <input type="radio"
                                value="returnTrip"
                                name="returnTrip"
                                checked={this.state.checked === "returnTrip"}
                                className="popup_innerContainer_radios_radio"
                                onChange={this.handleRadioBtn} />
            Return Trip
          </label>
                        <label>
                            <input type="radio"
                                value="multiCity"
                                name="multiCity"
                                checked={this.state.checked === "multiCity"}
                                className="popup_innerContainer_radios_radio"
                                onChange={this.handleRadioBtn} />
                                Multi-city Trip
                        </label>

                    </div>
                    <div className="popup_innerContainer_inputContainer">
                        <div className="popup_innerContainer_inputContainer_text">
                            <label className="popup_innerContainer_inputContainer_text_texts">Trip Name</label></div>
                        <div className="popup_innerContainer_inputContainer_div1"> <Input
                            type="text"
                            name="reason"
                            id="reason"
                            defaultValue={this.props.data && this.props.data.reason}
                            className="input inputs"
                            onChange={this.handleChange}
                        /></div>
                        <div className="popup_innerContainer_inputContainer_text">
                            <label className="popup_innerContainer_inputContainer_text_texts">Current Location</label></div>
                        <div className="popup_innerContainer_inputContainer_div1"><Input
                            type="text"
                            name="origin"
                            id="origin"
                            className="input inputs"
                            defaultValue={this.props.data && this.props.data.origin}
                            onChange={this.handleChange}
                        /></div>
                        {this.renderMultippleInputs()}
                        {this.state.checked === 'multiCity' && <button type="button" onClick={this.incrementInputs}>Add</button>}
                        {(this.state.checked === "multiCity" || this.state.checked === "returnTrip") && <>
                            <div className="popup_innerContainer_inputContainer_text">
                                <label className="popup_innerContainer_inputContainer_text_texts">Return Date</label></div>
                            <div className="popup_innerContainer_inputContainer_div1"> <Input
                                type="date"
                                name="returnDate"
                                id="returnDate"
                                defaultValue={this.props.data && moment(this.props.data.return_date).format('YYYY-MM-DD')}
                                className="input inputs"
                                onChange={this.handleDate}
                            /></div>
                        </>}
                        <div className="popup_innerContainer_inputContainer_text">
                            <label className="popup_innerContainer_inputContainer_text_texts">Passport Name</label></div>
                        <div className="popup_innerContainer_inputContainer_div1"><Input
                            type="text"
                            name="passportName"
                            id="passportName"
                            defaultValue={this.props.data && this.props.data.passportName}
                            className="input inputs"
                            onChange={this.handleChange}
                        /></div>
                        <div className="popup_innerContainer_inputContainer_text">
                            <label className="popup_innerContainer_inputContainer_text_texts">Passport Number</label></div>
                        <div className="popup_innerContainer_inputContainer_div1"><Input
                            type="text"
                            name="passportNumber"
                            id="passportNumber"
                            defaultValue={this.props.data && this.props.data.passportNumber}
                            className="input inputs"
                            onChange={this.handleChange}
                        /></div>
                        <div className="popup_innerContainer_buttons">
                            <Button
                                type="submit"
                                className="btn button"
                                value={this.state.isEdit ? "Update" : "Submit"}
                                onClick={this.handleSubmitBtn}
                            />
                            <Button
                                onClick={this.props.closePopup}
                                className="btn button"
                                value="Cancel"
                            />
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Popup;