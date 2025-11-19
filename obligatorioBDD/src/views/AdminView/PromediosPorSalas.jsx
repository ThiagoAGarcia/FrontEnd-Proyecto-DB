import React, {useEffect, useState} from 'react'
import CanvasJSReact from '@canvasjs/react-charts'
import getPromedioPorSalasService from '../../service/getPromediosPorSalas'

const CanvasJSChart = CanvasJSReact.CanvasJSChart
const PromedioPorSalas = () => {
  const [dataPoints, setDataPoints] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPromedioPorSalasService()

        if (!res?.success) {
          throw new Error(res?.description || 'Error al obtener los datos')
        }

        const puntos = res.promedioPorSalas.map((item) => ({
          label: `${item.name}`,
          y: parseFloat(item.promedio_participantes),
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
      text: 'Promedio por salas reservadas',
    },
    axisY: {
      includeZero: true,
      title: 'Promedio',
    },
    axisX: {
      title: 'Sala',
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
    <div className="w-full overflow-x-auto h-[70vh]">
      <div className="min-w-[600px] max-w-[900px]" style={{margin: '0 auto'}}>
        <CanvasJSChart options={options} />
      </div>
    </div>
  )
}

export default PromedioPorSalas
