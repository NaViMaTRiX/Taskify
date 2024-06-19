import React, { useState } from 'react';
import { RangeDatePicker } from "@y0c/react-datepicker";
import "@y0c/react-datepicker/assets/styles/calendar.scss";
import "./DatePickerStyles.css"

export default function CalendarModel() {
  const [value, onChange] = useState(new Date().toDateString());

  return (
    <div className='inline'>
      <RangeDatePicker
        dateFormat='DD-MM-YYYY'
        value={value}
        onChange={date => onChange(date as any)}
        className='bg-neutral-200 hover:bg-neutral-300 text-black font-medium rounded rounded-md px-2 py-0 h-8'
        showToday
      />
    </div>
  );
}


