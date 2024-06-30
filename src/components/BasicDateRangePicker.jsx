import React, { useContext, useState } from 'react';
import { bookingApi } from '../Context-API/WraperContext';

const BasicDateRangePicker = () => {
const {startDate, setStartDate, endDate, setEndDate} = useContext(bookingApi)

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const isDateBetween = (dateString) => {
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    const dateObj = new Date(dateString);
    return startDateObj <= dateObj && dateObj <= endDateObj;
  };

  const getBackgroundClass = (dateString) => {
    return isDateBetween(dateString) ? 'bg-teal-500 font-semibold' : '';
  };

  const isDisabled = (date) => { // Use the actual date argument passed to the function
    const today = new Date().toISOString().split('T')[0];
    return date < today; // Disable dates before today
  };

  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor="startDate">Check-in:</label>
      <input
        id="startDate"
        type="date"
        value={startDate}
        onChange={handleStartDateChange}
        min={new Date().toISOString().split('T')[0]} // Disable past dates (ISO format)
        className={`px-2 py-1 rounded border border-gray-300 focus:outline-none focus:border-teal-500 active:bg-teal-500  ${getBackgroundClass(startDate)} ${isDisabled(startDate) ? 'opacity-50 cursor-not-allowed' : ''}`}
      />
      <label htmlFor="endDate">Check-out:</label>
      <input
        id="endDate"
        type="date"
        value={endDate}
        onChange={handleEndDateChange}
        min={startDate} // Disable dates before check-in
        className={`px-2 py-1 rounded border border-gray-300 focus:outline-none focus:border-teal-500 focus:bg-teal-500 active:bg-teal-500 ${getBackgroundClass(endDate)} ${isDisabled(endDate) ? 'opacity-50 cursor-not-allowed' : ''}`}
      />
    </div>
  );
};

export default BasicDateRangePicker;
