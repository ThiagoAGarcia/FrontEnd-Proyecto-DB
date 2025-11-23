import {useEffect, useState} from 'react'
import getDaySanctionsService from '../../service/getDaySanctionsService'

export default function Sanctions() {
  const [sanctions, setSanctions] = useState([])

  useEffect(() => {
    const getTodaySanctions = async () => {
      const todaySanctions = await getDaySanctionsService()
      console.log(todaySanctions)
      if (todaySanctions?.success) {
        let todaySanctionsArray = todaySanctions.sanciones || []
        console.log(todaySanctionsArray)
        setSanctions(todaySanctionsArray)
      } else {
        setSanctions([])
      }
    }

    getTodaySanctions()
  }, [])

  return (
    <>
      {sanctions.length > 0 ? (
        <div className="flex flex-col gap-5 items-start">
          <h2 className="ml-1 font-semibold text-gray-800 text-2xl">
            Sanciones
          </h2>

          {sanctions.map((sanction) => (
            <div
              key={sanction.id}
              className="w-full rounded-2xl border border-gray-200 bg-white shadow-sm p-4 md:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-slate-700">
                    {sanction.name} {sanction.lastName}
                  </h2>
                  <p className="text-sm text-slate-600">
                    <span className="font-medium">Correo: </span>
                    {sanction.mail}
                  </p>
                  <p className="text-sm text-slate-600">
                    <span className="font-medium">Cédula: </span>
                    {sanction.ci}
                  </p>
                </div>

                <span className="inline-flex items-center rounded-full bg-red-50 px-3 py-1 text-sm font-semibold text-red-700">
                  {sanction.description}
                </span>
              </div>

              <div className="mt-4 border-t border-gray-100 pt-4">
                <p className="text-sm text-slate-700">
                  <span className="font-semibold text-blue-900">
                    Bibliotecario/a:{' '}
                  </span>
                  {sanction.librarian}
                </p>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-slate-700">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Fecha de inicio
                  </span>
                  <p className="mt-1">{sanction.start}</p>
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Fecha de finalización
                  </span>
                  <p className="mt-1">{sanction.end}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <span className="font-medium text-2xl text-gray-600">
          No se ha enviado ninguna sanción hoy
        </span>
      )}
    </>
  )
}
