import {useState} from 'react'
import patchAcceptRequestService from '../service/patchAcceptRequestService'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import patchDenyRequestService from '../service/patchDenyRequestService'
import getGroupInfoService from '../service/getGroupInfoService.jsx'
import Modal from './modal'

export default function NotificationUser({name, date, id, onAccepted, onDeny}) {
  const [open, setOpen] = useState(false)
  const [group, setGroup] = useState(null)
  const [loading, setLoading] = useState(false)

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

        setOpen(false)
      } else {
        if (onAccepted) onAccepted()
        toast.error(result?.description || 'Error al aceptar la solicitud')
      }
    } catch (error) {
      toast.error('Error del servidor')
    }
  }

  const cancelGroupRequest = async (id) => {
    try {
      const result = await patchDenyRequestService(id)

      if (result?.success) {
        toast.success('Solicitud rechazada correctamente')

        if (onDeny) onDeny()
        setOpen(false)
      } else {
        toast.error(result?.description || 'Error al rechazar la solicitud')
      }
    } catch (error) {
      toast.error('Error del servidor')
    }
  }

  const handleOpenModal = async () => {
    try {
      setOpen(true)
      setLoading(true)
      const data = await getGroupInfoService(id)

      if (data?.success) {
        setGroup(data.group)
      } else {
        toast.error(
          data?.description || 'Error al obtener la información del grupo'
        )
        setOpen(false)
      }
    } catch (error) {
      toast.error('Error del servidor')
      setOpen(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div
        className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-gray-50 transition cursor-pointer"
        onClick={handleOpenModal}>
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">Solicitud de grupo</span>
          <span className="text-sm font-semibold text-gray-800">{name}</span>
          <span className="text-[11px] text-gray-400">{formattedDate}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition"
            onClick={(e) => {
              e.stopPropagation()
              cancelGroupRequest(id)
            }}>
            <i className="fa-solid fa-x"></i>
          </button>

          <button
            className="w-8 h-8 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-600 hover:bg-emerald-200 transition"
            onClick={(e) => {
              e.stopPropagation()
              acceptGroupRequest(id)
            }}>
            <i className="fa-solid fa-check text-lg"></i>
          </button>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="text-left w-full p-4 sm:p-6">
          <h2 className="font-bold text-[#052e66] text-2xl sm:text-3xl mb-4">
            Detalles del grupo
          </h2>

          {loading && (
            <p className="text-gray-600 text-sm">Cargando información...</p>
          )}

          {!loading && group && (
            <div className="space-y-4">
              <div className="bg-[#f4f7fc] rounded-xl p-4 border border-gray-200">
                <p className="text-sm text-gray-500">Nombre del grupo</p>
                <p className="text-lg font-semibold text-gray-800">
                  {group.name}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#f4f7fc] rounded-xl p-4 border border-gray-200">
                  <p className="text-sm text-gray-500">Líder</p>
                  <p className="text-base font-semibold text-gray-800">
                    {group.leader.name} {group.leader.lastName}
                  </p>
                  <p className="text-xs text-gray-500">CI: {group.leader.ci}</p>
                </div>

                <div className="bg-[#f4f7fc] rounded-xl p-4 border border-gray-200 flex flex-col gap-1">
                  <p className="text-sm text-gray-500">Estado</p>
                  <p className="text-base font-semibold text-gray-800">
                    {group.status}
                  </p>
                  <p className="text-xs text-gray-500">
                    Integrantes: {group.currentMembers}
                    {group.maxCapacity
                      ? ` / ${group.maxCapacity}`
                      : ' (sin capacidad definida)'}
                  </p>
                  {group.maxCapacity && (
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-[11px] font-semibold mt-1 ${
                        group.isFull
                          ? 'bg-red-100 text-red-600'
                          : 'bg-emerald-100 text-emerald-600'
                      }`}>
                      {group.isFull ? 'Grupo lleno' : 'Hay cupo disponible'}
                    </span>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-inner border border-gray-200 max-h-60 overflow-y-auto scrollbar space-y-2">
                <p className="text-sm font-medium text-gray-700 mb-1">
                  Integrantes del grupo
                </p>

                {group.members && group.members.length > 0 ? (
                  <ul className="space-y-1 text-sm text-gray-700">
                    {group.members.map((m) => (
                      <li
                        key={m.ci}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-[#f4f7fc] rounded-lg px-3 py-2 border border-gray-200">
                        <span className="font-semibold">
                          {m.name} {m.lastName}
                        </span>
                        <span className="text-xs text-gray-500">
                          CI: {m.ci}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-gray-500">
                    Todavía no hay integrantes en este grupo.
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-end gap-3 mt-4">
                <button
                  className="w-full sm:w-1/3 py-3 cursor-pointer text-white bg-red-500 rounded-xl font-semibold shadow-md hover:bg-red-600 transition text-sm"
                  onClick={() => cancelGroupRequest(id)}>
                  Rechazar solicitud
                </button>

                <button
                  className="w-full sm:w-1/3 py-3 cursor-pointer text-white bg-[#052e66] rounded-xl font-semibold shadow-md hover:bg-[#073c88] transition text-sm"
                  onClick={() => acceptGroupRequest(id)}>
                  Aceptar solicitud
                </button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </>
  )
}
