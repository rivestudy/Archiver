import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, ...rest }) => {
  const token = localStorage.getItem('authToken');  
  const username = localStorage.getItem('userName');
  const email = localStorage.getItem('userEmail');
  const division = localStorage.getItem('userDivision');

  // If the token exists, render the component with user data passed as props
  if (token) {
    // Clone the element and pass additional user data as props
    return React.cloneElement(element, { username, email, division });
  }

  // If the token doesn't exist, redirect to login
  return <Navigate to="/login" />;
};

export default PrivateRoute;
