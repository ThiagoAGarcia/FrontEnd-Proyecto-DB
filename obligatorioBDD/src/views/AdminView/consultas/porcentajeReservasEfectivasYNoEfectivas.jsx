import React, {useEffect, useState} from 'react'
import CanvasJSReact from '@canvasjs/react-charts'
import getPorcentajeReservasEfectivasYNoEfectivas from '../../../service/getPorcentajeReservasEfectivasYNoEfectivas'

const CanvasJSChart = CanvasJSReact.CanvasJSChart

const PorcentajeReservasEfectivasYNoEfectivas = () => {
  const [dataPoints, setDataPoints] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPorcentajeReservasEfectivasYNoEfectivas()

        if (!res?.success) {
          throw new Error(res?.description || 'Error al obtener los datos')
        }

        const datos = res.reservas[0]

        const puntos = [
          {label: 'Finalizadas', y: parseFloat(datos.Finalizada)},
          {label: 'Canceladas', y: parseFloat(datos.Cancelada)},
        ]

        setDataPoints(puntos)
      } catch (err) {
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
      text: 'Reservas Efectivas vs Canceladas',
    },
    data: [
      {
        type: 'doughnut',
        indexLabel: '{label}: {y}%',
        yValueFormatString: '#,##0',
        explodeOnClick: true,
        startAngle: -90,
        dataPoints: dataPoints,
      },
    ],
  }

  if (loading) return <p>Cargando estadísticas...</p>
  if (error) return <p className="text-red-500">Error: {error}</p>

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[500px]">
        <CanvasJSChart options={options} />
      </div>
    </div>
  )
}

export default PorcentajeReservasEfectivasYNoEfectivas
