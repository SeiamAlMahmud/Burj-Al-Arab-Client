import React, { useContext } from 'react'
import Button from '@mui/material/Button';
import {  signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../firebase/firebase.config';
import { bookingApi } from '../Context-API/WraperContext';
import { useLocation, useNavigate } from 'react-router-dom';
const Login = () => {

  const { isAuthenticated,LogOut,GoogleLogin } = useContext(bookingApi);
  const location = useLocation();
  const navigate = useNavigate()
  const {from} =location.state
  console.log(from)
  if (isAuthenticated) {
   navigate(from)
  }
  
  return (
    <div>
   { !isAuthenticated ? <Button variant="contained" color="error" onClick={GoogleLogin}>
      Google
    </Button> :<Button variant="contained" color="error" onClick={LogOut}>
      LogOut
    </Button>}
    </div>
  )
}

export default Login