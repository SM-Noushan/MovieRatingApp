import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRouteUser = ({isLoggedIn, role, children}) => {
  if(isLoggedIn){
      if(role === 'user')
        return children;
      else
        return <Navigate to="/admin/dashboard" />
    }
    return <Navigate to="/" />;
}

export default ProtectedRouteUser;