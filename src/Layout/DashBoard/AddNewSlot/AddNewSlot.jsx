import React from 'react';
import Select from "react-select";

const AddNewSlot = () => {

  return (
    <form >
      <h3>Add New Slot</h3>

      {/* Display previous trainer data (readonly) */}
      <div>
        <label>Trainer Name:</label>
        <input type="text"  readOnly />
      </div>

      <div>
        <label>Email:</label>
        <input type="email"  readOnly />
      </div>

      {/* Select Days */}
      <div>
        <label>Select Days:</label>
        <Select
          isMulti
          // options={trainerData.availableDays || []}
          // value={selectedDays}
          // onChange={setSelectedDays}
          // isDisabled={false}
        />
      </div>

      {/* Slot Name */}
      <div>
        <label>Slot Name:</label>
        <input
          type="text"
          // value={slotName}
          // onChange={(e) => setSlotName(e.target.value)}
          placeholder="Morning Slot"
        />
      </div>

      {/* Slot Time */}
      <div>
        <label>Slot Time:</label>
        <input
          type="text"
          // value={slotTime}
          // onChange={(e) => setSlotTime(e.target.value)}
          placeholder="1 hour"
        />
      </div>

      {/* Select Class */}
      <div>
        <label>Classes Include:</label>
        <Select
          // options={classes.map((cls) => ({ value: cls.id, label: cls.name }))}
          // value={selectedClass}
          // onChange={setSelectedClass}
        />
      </div>

      {/* Other Info */}
      <div>
        <label>Other Info:</label>
        <textarea
          // value={otherInfo}
          // onChange={(e) => setOtherInfo(e.target.value)}
          placeholder="Additional information"
        />
      </div>

      {/* Submit Button */}
      <div>
        <button type="submit">Submit/Add Class</button>
      </div>
    </form>
  );
};

export default AddNewSlot;