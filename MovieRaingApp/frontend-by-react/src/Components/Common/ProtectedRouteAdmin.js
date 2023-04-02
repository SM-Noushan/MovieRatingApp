import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRouteAdmin = ({isLoggedIn, role, children}) => {
  if(isLoggedIn){
      if(role === 'admin')
        return children;
      else
        return <Navigate to="/user/dashboard" />
    }
    return <Navigate to="/" />;
}

export default ProtectedRouteAdmin;