import React from 'react';
import LabelInput from './labelInput';

const CreateRoomForm = ({
  ScrollBar,
  currentState,
  handleChange,
  removeItem,
  handleMultipleChange,
  setTheState,
  error
}) => {
  return (
    <div className="accommodation_popup_innerContainer_inputContainer">
      <ScrollBar style={{ height: 300 }}>
        <LabelInput labelName="Type"
          name="type"
          OnChange={handleChange}
          currentState={currentState}
          error={error && error.type ? error.type : ''}/>
        <LabelInput labelName="Size"
          name="size"
          OnChange={handleChange}
          currentState={currentState}
          error={error && error.size ? error.size : ''}
        />
        <LabelInput
          labelName="Amenities"
          name="amenities"
          inputType="InputMultiple"
          currentState={currentState}
          handleMultipleChange={() => handleMultipleChange}
          removeItem={removeItem}
          error={error && error.amenities ? error.amenities : ''}
        />
        <LabelInput
          labelName="Bedrooms"
          name="bedrooms"
          OnChange={handleChange}
          currentState={currentState}
          error={error && error.bedrooms ? error.bedrooms : ''}
        />
        <LabelInput
          labelName="Cost"
          name="cost"
          OnChange={handleChange}
          currentState={currentState}
          error={error && error.cost ? error.cost : ''}
        />
        <LabelInput
          labelName="Room No."
          name="room_number"
          OnChange={handleChange}
          currentState={currentState}
          error={error && error.room_number ? error.room_number : ''}
        />
        <LabelInput
          labelName="Image(s)"
          inputType="InputImageUploader"
          currentState={currentState}
          setTheState={setTheState}
          error={error && error.files ? error.files : ''}
        />
      </ScrollBar>
    </div>
  );
};

export default CreateRoomForm;
