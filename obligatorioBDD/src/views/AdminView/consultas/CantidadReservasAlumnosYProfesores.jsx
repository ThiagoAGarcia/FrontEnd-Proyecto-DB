import React, {useEffect, useState} from 'react'
import getReservasPorProfesoresYAlumnosService from '../../../service/getReservasPorProfesoresYAlumnosService'

const TotalReservas = () => {
  const [cantidad, setCantidad] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getReservasPorProfesoresYAlumnosService()

        if (!res?.success) {
          throw new Error(res?.description || 'Error al obtener los datos')
        }

        const total = res.cantidadReservas[0].CantidadReservas
        setCantidad(total)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <p>Cargando estadísticas...</p>
  if (error) return <p style={{color: 'red'}}>Error: {error}</p>

  return (
    <div className="bg-white shadow-md rounded-xl p-6 text-center w-full max-w-sm mx-auto">
      <h2 className="text-xl font-semibold text-gray-700">
        Total de Reservas Realizadas
      </h2>

      <p className="text-6xl font-bold text-blue-600 mt-4">{cantidad}</p>

      <p className="text-gray-500 mt-2">Alumnos + Profesores</p>
    </div>
  )
}

export default TotalReservas
