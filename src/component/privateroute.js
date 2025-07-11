import React, { useContext } from 'react'
import { ProductContext } from './productContext'
import { Navigate, useLocation } from 'react-router-dom'

function PrivateRoute({children}) {
  
  
    const { user } = useContext(ProductContext);
    const location = useLocation();
  
    if(!user)
    {
       return  <Navigate to={`/?login=true&redirect=${location.pathname}`} replace />
    }
    return children;

}

export default PrivateRoute