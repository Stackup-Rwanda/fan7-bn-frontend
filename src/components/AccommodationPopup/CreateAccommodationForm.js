import React from 'react'
import LabelInput from './labelInput';

const CreateAccommodationForm = ({
    ScrollBar,
    currentState,
    handleChange,
    removeItem,
    handleMultipleChange,
    OnChangeDescription,
    error,
    setTheState })=> {
    return (
      <div className="accommodation_popup_innerContainer_inputContainer">
        <ScrollBar style={{ height: 300 }}>
          <LabelInput
            labelName="Name"
            name="name"
            OnChange={handleChange}
            error={error && error.name? error.name: ''}
          />
          <LabelInput
            labelName="Address"
            name="address"
            OnChange={handleChange}
            error={error && error.address ? error.address : ''}
          />
          <LabelInput
            labelName="Geo-location"
            name="geoLocation"
            OnChange={handleChange}
            error={error && error.geoLocation ? error.geoLocation : ''}
          />
          <LabelInput
            labelName="Services"
            name="services"
            inputType="InputMultiple"
            currentState={currentState}
            handleMultipleChange={()=>handleMultipleChange}
            removeItem={removeItem}
            error={error && error.services ? error.services : ''}
          />
          <LabelInput
            labelName="Amenities"
            name="amenities"
            inputType="InputMultiple"
            currentState={currentState}
            handleMultipleChange={()=>handleMultipleChange}
            removeItem={removeItem}
            error={error && error.amenities ? error.amenities : ''}
          />
          <LabelInput
            labelName="Image(s)"
            inputType="InputImageUploader"
            currentState={currentState}
            setTheState={setTheState}
            error={error && error.files ? error.files : ''}
          />
          <LabelInput
            labelName="Description"
            inputType="InputTextArea"
            name="description"
            Class="display_block"
            OnChangeDescription={OnChangeDescription}
            error={error && error.description ? error.description : ''}
          />
        </ScrollBar>
      </div>
    );
}

export default CreateAccommodationForm;
