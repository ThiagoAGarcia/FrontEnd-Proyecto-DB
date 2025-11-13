import {Navigate, Outlet} from 'react-router-dom'

const Protected = ({allowedRoles}) => {
  const token = localStorage.getItem('token')
  const role = JSON.parse(localStorage.getItem('role'))

  if (!token) return <Navigate to="/" />

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" />
  }

  return <Outlet />
}

export default Protected
