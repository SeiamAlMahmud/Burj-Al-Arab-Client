import React, { createContext, useEffect, useState } from 'react'
export const bookingApi = createContext(null)
const WraperContext = ({ children }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  console.log(startDate)
  console.log(endDate)
 
  const handleCheckIn = () => {
    const apiUrl = 'https://burj-al-arab-client-server.vercel.app/addBooking'
    // const apiUrl = 'http://127.0.0.1:3000/addBooking'
    const newBooking = {
      name: '',
      checkIn: startDate,
      checkOut: endDate,
      submitTime: {
        inDetails: new Date(),
        inLocalDetails: new Date().toLocaleString(),
        inLocal1TimeDetails: new Date().toLocaleTimeString(),
        submitDate: new Date().getDate(),
        submitYear: new Date().getFullYear(),
        submitHour: new Date().getHours(),
        submitMinute: new Date().getDate(),
        submitSecond: new Date().getSeconds(),
      },

    }
    fetch(apiUrl, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBooking)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
  }
 
  
  const info = { handleCheckIn, startDate, setStartDate, endDate, setEndDate,}
  return (
    <>
      <bookingApi.Provider value={info}>
        {children}
      </bookingApi.Provider>
    </>
  )
}

export default WraperContext