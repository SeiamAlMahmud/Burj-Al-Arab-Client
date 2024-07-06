import React, { createContext, useEffect, useState } from 'react'
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from '../firebase/firebase.config';
export const bookingApi = createContext(null)
import axios from 'axios';



const WraperContext = ({ children }) => {


  const [isLoading, setIsLoading] = useState(false)
  const [errLoading, setErrorLoading] = useState(null)
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  console.log(startDate)
  console.log(endDate)

  const apiUrl1 = 'https://burj-al-arab-client-server.vercel.app/addBooking'
  const apiUrl2 = 'http://127.0.0.1:3000/addBooking'

  useEffect(() => {
    console.log('session log')
      axios.get('http://127.0.0.1:3000/login/token', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('uid')}`,
            'Content-Type': 'application/json' // Optional
        }
    })
    .then(response =>{ 
      setIsAuthenticated(true)
      console.log(response.data)})
    .catch(error => console.error(error))
    }, [])
    useEffect(()=>{
      try {
        axios.get('http://127.0.0.1:3000/getBooking', {
          headers: {
              Authorization: `Bearer ${localStorage.getItem('uid')}`,
              'Content-Type': 'application/json' // Optional
          }
      })
      .then(response =>{ 
        setIsAuthenticated(true)
        console.log(response.data)})
      .catch(error => console.error(error))
      } catch (error) {
        
      }
     
    },[])
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
      uid: user?.uid,
      email: user?.email

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




  const GoogleLogin = async () => {
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
        setUser(user)
        try {
          const userObject = {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid
          }
          fetch('http://127.0.0.1:3000/api/login', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userObject)
          })
            .then(res => res.json())
            .then(data => {
              console.log(data)
              try {
                if (data) {
                  // Store token securely (e.g., local storage with HttpOnly cookie for security)
                  localStorage.setItem('uid', data.token);

                  // Redirect to protected area or handle successful login
                }
              } catch (error) {
                console.log(error)
              }
            })
        } catch (error) {

        }


      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.customData.email;
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
      localStorage.removeItem('uid')
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