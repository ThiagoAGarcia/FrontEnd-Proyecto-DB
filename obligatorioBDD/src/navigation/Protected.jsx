import {Navigate, Outlet} from 'react-router-dom'
import {useEffect, useState} from 'react'

const clearAuth = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('role')
  localStorage.removeItem('roles')
  localStorage.removeItem('ci')
}

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

      if (!payload.exp || expMs <= now) {
        clearAuth()
        setValid(false)
        return
      }

      const activeRole = payload.role
      const tokenRoles = Array.isArray(payload.roles)
        ? payload.roles
        : payload.role
        ? [payload.role]
        : []

      if (activeRole && tokenRoles.length && !tokenRoles.includes(activeRole)) {
        clearAuth()
        setValid(false)
        return
      }

      if (allowedRoles && allowedRoles.length > 0) {
        if (!activeRole || !allowedRoles.includes(activeRole)) {
          setValid(false)
          return
        }
      }

      const timeout = setTimeout(() => {
        clearAuth()
        setValid(false)
      }, expMs - now)

      setValid(true)

      return () => clearTimeout(timeout)
    } catch (err) {
      console.error('Error decodificando token:', err)
      clearAuth()
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
