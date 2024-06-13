import React, { useState } from 'react';
import { RangeDatePicker } from "@y0c/react-datepicker";
import "@y0c/react-datepicker/assets/styles/calendar.scss";

export default function CalendarModel() {
  const [value, onChange] = useState(new Date().toDateString());

  return (
    <div className='flex justify-center items-center'>
      <RangeDatePicker
        dateFormat='DD-MM-YYYY'
        value={value}
        onChange={date => onChange(date as any)}
        className='w-full'
      />
    </div>
  );
}


