import React, { useEffect, useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { bookingApi } from '../Context-API/WraperContext';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated } = useContext(bookingApi); // Access auth state from context

  
  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login"  state={{ from: location.pathname }} />;
  }else{

    
    return children; // Render children if authenticated
  }
};

export default PrivateRoute;
