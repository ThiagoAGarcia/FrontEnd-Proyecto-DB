import {Navigate, Outlet} from 'react-router-dom'
import {useEffect, useState} from 'react'

const Protected = ({allowedRoles}) => {
  const [valid, setValid] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      setValid(false)
      return
    }

    try {
      const parts = token.split('.')
      if (parts.length !== 3) {
        throw new Error('Token inválido')
      }

      const payloadBase64 = parts[1]
      const payloadJson = atob(
        payloadBase64.replace(/-/g, '+').replace(/_/g, '/')
      )
      const payload = JSON.parse(payloadJson)

      const expMs = payload.exp * 1000
      const now = Date.now()

      if (expMs <= now) {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        localStorage.removeItem('roles')
        localStorage.removeItem('activeRole')
        setValid(false)
        return
      }

      const tokenRoles = Array.isArray(payload.roles)
        ? payload.roles
        : payload.role
        ? [payload.role]
        : []

      if (allowedRoles && allowedRoles.length > 0) {
        const hasPermission = tokenRoles.some((r) => allowedRoles.includes(r))
        if (!hasPermission) {
          setValid(false)
          return
        }
      }

      const timeout = setTimeout(() => {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        localStorage.removeItem('roles')
        localStorage.removeItem('activeRole')
        setValid(false)
      }, expMs - now)

      setValid(true)

      return () => clearTimeout(timeout)
    } catch (err) {
      console.error('Error decodificando token:', err)
      localStorage.removeItem('token')
      localStorage.removeItem('role')
      localStorage.removeItem('roles')
      localStorage.removeItem('activeRole')
      setValid(false)
    }
  }, [allowedRoles])

  if (valid === null) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-300 flex items-center justify-center">
        Verificando acceso...
      </div>
    )
  }

  if (!valid) return <Navigate to="/sin-token" />

  return <Outlet />
}

export default Protected
