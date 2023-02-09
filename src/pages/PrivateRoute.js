import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Navigate } from 'react-router-dom'
// will remove later

const PrivateRoute = ({ children }) => {
  const { user } = useAuth0()

  if (!user) {
    return <Navigate to='/' />
  } else {
    return children
  }
}
export default PrivateRoute
