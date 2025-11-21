import React, {useEffect, useState} from 'react'
import CanvasJSReact from '@canvasjs/react-charts'
import getReservasPorCarreraYFacultadService from '../../service/getReservasPorCarreraYFacultadService'

const CanvasJSChart = CanvasJSReact.CanvasJSChart
const ReservacionesPorCarreraYFacultad = () => {
  const [dataPoints, setDataPoints] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getReservasPorCarreraYFacultadService()

        if (!res?.success) {
          throw new Error(res?.description || 'Error al obtener los datos')
        }

        const puntos = res.reservasPorCarreraYFacultad.map((item) => ({
          label: `${item.Carrera} - ${item.Facultad}`,
          y: parseFloat(item.CantidadReservasPor),
        }))

        setDataPoints(puntos)
      } catch (err) {
        console.error(err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: 'light2',
    title: {
      text: 'Reservaciones por carrera y facultad',
    },
    axisY: {
      includeZero: true,
      title: 'cantidad',
    },
    axisX: {
      title: 'carrera y facultad',
    },
    data: [
      {
        type: 'bar',
        indexLabelFontColor: '#5A5757',
        indexLabelPlacement: 'outside',
        dataPoints: dataPoints,
      },
    ],
  }

  if (loading) return <p>Cargando estadísticas...</p>
  if (error) return <p style={{color: 'red'}}>Error: {error}</p>

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[600px] max-w-[900px]" style={{margin: '0 auto'}}>
        <CanvasJSChart options={options} />
      </div>
    </div>
  )
}

export default ReservacionesPorCarreraYFacultad
