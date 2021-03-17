import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function WebDatePicker({ setDate }) {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <DatePicker
      selected={startDate}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={15}
      onChange={(date) => {
        setDate(date);
        setStartDate(date);
      }}
    />
  );
}

export default WebDatePicker;
