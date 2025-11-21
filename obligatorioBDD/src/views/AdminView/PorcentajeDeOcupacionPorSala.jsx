import React, {useEffect, useState} from 'react'
import CanvasJSReact from '@canvasjs/react-charts'
import getPorcentajeOcupacionPorSalaService from '../../service/getPorcentajeOcupacionPorSalaService'

const CanvasJSChart = CanvasJSReact.CanvasJSChart

const PorcentajeDeOcupacionPorSala = () => {
  const [dataPoints, setDataPoints] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPorcentajeOcupacionPorSalaService()

        if (!res?.success) {
          throw new Error(res?.description || 'Error al obtener los datos')
        }

        const puntos = res.porcentajeDeOcupacion.map((item) => ({
          label: item.buildingName,
          y: parseFloat(item.porcentaje_ocupacion),
        }))

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
      text: 'Porcentaje de Ocupación por Sala',
    },
    data: [
      {
        type: 'doughnut',
        indexLabel: '{label}: {y}%',
        yValueFormatString: "#,##0.##'%'",
        explodeOnClick: true,
        dataPoints: dataPoints,
      },
    ],
  }

  if (loading) return <p>Cargando estadísticas...</p>
  if (error) return <p style={{color: 'red'}}>Error: {error}</p>

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[500px]">
        <CanvasJSChart options={options} />
      </div>
    </div>
  )
}

export default PorcentajeDeOcupacionPorSala
