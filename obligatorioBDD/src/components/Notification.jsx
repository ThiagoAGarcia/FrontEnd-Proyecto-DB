import patchAcceptRequestService from '../service/patchAcceptRequestService'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function NotificationUser({name, date, id, onAccepted}) {
  const formattedDate = new Date(date).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })

  const acceptGroupRequest = async (id) => {
    try {
      const result = await patchAcceptRequestService(id)

      if (result?.success) {
        toast.success('Solicitud aceptada correctamente')

        if (onAccepted) onAccepted()
      } else {
        toast.error(result?.description || 'Error al aceptar la solicitud')
      }
    } catch (error) {
      console.log(error)
      toast.error('Error del servidor')
    }
  }

  return (
    <div className="flex items-center justify-between rounded-lg px-3 py-2">
      <div className="flex flex-col">
        <span className="text-xs text-gray-500">Solicitud de grupo</span>
        <span className="text-sm font-semibold text-gray-800">{name}</span>

        <span className="text-[11px] text-gray-400">{formattedDate}</span>
      </div>

      <div className="flex items-center gap-2">
        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition">
          <i className="fa-solid fa-circle-info text-lg"></i>
        </button>

        <button
          className="w-8 h-8 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-600 hover:bg-emerald-200 transition"
          onClick={() => acceptGroupRequest(id)}>
          <i className="fa-solid fa-check text-lg"></i>
        </button>
      </div>
    </div>
  )
}
