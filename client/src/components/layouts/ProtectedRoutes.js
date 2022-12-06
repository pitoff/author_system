import {Navigate, useLocation} from 'react-router-dom'
import React, { useContext } from 'react'
import { UserContext } from '../../UserContext'


const ProtectedRoutes = ({children}) => {
    const { user } = useContext(UserContext)
    const location = useLocation()
    if(!user){
        return <Navigate to="/login" replace state={{ from: location}} />
    }

    return children
  
}

export default ProtectedRoutes