import React, {useEffect, useState} from 'react'
import CanvasJSReact from '@canvasjs/react-charts'
import getSancionesProfesoresYAlumnos from '../../../service/getSancionesAlumnosYProfesoresService'

const CanvasJSChart = CanvasJSReact.CanvasJSChart
const CantidadSancionesProfesoresYAlumnos = () => {
  const [dataPoints, setDataPoints] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getSancionesProfesoresYAlumnos()

        if (!res?.success) {
          throw new Error(res?.description || 'Error al obtener los datos')
        }

        const puntos = res.sanciones.map((item) => ({
          label: `${item.ci} - ${item.name} ${item.lastName}`,
          y: parseFloat(item.sanciones),
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
      text: 'Sanciones',
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
    <div className="w-full overflow-x-auto">
      <div className="min-w-[600px] max-w-[900px]" style={{margin: '0 auto'}}>
        <CanvasJSChart options={options} />
      </div>
    </div>
  )
}

export default CantidadSancionesProfesoresYAlumnos
