import React from 'react';
import { Navigate } from 'react-router-dom';

const IsSigned = ({isLoggedIn, role, children}) => {
  if(isLoggedIn){
        if(role === 'admin')
            return <Navigate to='/admin/dashboard' />
        else
            return <Navigate to='/user/dashboard' />
    }
    return children;
}

export default IsSigned;