import React, { createContext, useEffect, useState } from 'react'
import {  signInWithPopup, GoogleAuthProvider,signOut } from "firebase/auth";
import { auth } from '../firebase/firebase.config';
export const bookingApi = createContext(null)
const WraperContext = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [errLoading, setErrorLoading] = useState(null)
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  console.log(startDate)
  console.log(endDate)

  const apiUrl1 = 'https://burj-al-arab-client-server.vercel.app/addBooking'
  const apiUrl2 = 'http://127.0.0.1:3000/addBooking'
  const handleCheckIn = () => {
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

    // ,"Access-Control-Allow-Credentials": true, "Access-Control-Allow-Origin": apiUrl1 || apiUrl2 
    fetch(apiUrl2 || apiUrl1, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBooking)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
  }
  const provider = new GoogleAuthProvider();
  const GoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        setIsAuthenticated(true)
        console.log(user)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }
  const LogOut = () => {
    console.log('first')
    signOut(auth).then(() => {
      console.log('Sign-out successful.')
      setIsAuthenticated(false)
    }).catch((error) => {
      // An error happened.
    });
  }

  const info = { handleCheckIn, startDate, setStartDate, endDate, setEndDate, isAuthenticated, LogOut, GoogleLogin }
  return (
    <>
      <bookingApi.Provider value={info}>
        {children}
      </bookingApi.Provider>
    </>
  )
}

export default WraperContext