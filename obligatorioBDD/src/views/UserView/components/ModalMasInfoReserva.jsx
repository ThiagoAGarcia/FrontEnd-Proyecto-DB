import {useState, useEffect} from 'react'
import Modal from '../../../components/modal.jsx'
import {toast} from 'react-toastify'
import {Oval} from 'react-loader-spinner'
import getGroupReservationInfoService from '../../../service/getReservationInfoService.jsx'
import extendReservationBlockService from '../../../service/extendReservationBlockService.jsx'

export default function ModalMasInfoReserva({open, selectedGroup, onClose}) {
  const [reservation, setReservation] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchReservation = async (groupId) => {
    if (!groupId) return
    try {
      setIsLoading(true)
      const resp = await getGroupReservationInfoService(groupId)

      if (resp?.success && resp.reservation) {
        setReservation(resp.reservation)
      } else {
        setReservation(null)
        toast.error(
          resp?.description ||
            'No se pudo obtener la información de la reserva',
          {
            position: 'bottom-left',
            autoClose: 3000,
          }
        )
      }
    } catch (e) {
      setReservation(null)
      toast.error('Error al obtener la información de la reserva', {
        position: 'bottom-left',
        autoClose: 3000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!open || !selectedGroup) return
    fetchReservation(selectedGroup)
  }, [open, selectedGroup])

  useEffect(() => {
    if (!open) {
      setReservation(null)
      setIsLoading(false)
    }
  }, [open])

  const handleExtendBlock = async () => {
    if (!reservation?.studyGroupId) return

    try {
      setIsLoading(true)
      const resp = await extendReservationBlockService(reservation.studyGroupId)

      if (resp?.success) {
        toast.success(
          resp?.description || 'La reserva se extendió 1 bloque más',
          {
            position: 'bottom-left',
            autoClose: 2500,
          }
        )
        await fetchReservation(reservation.studyGroupId)
      } else {
        toast.error(
          resp?.description || 'No se pudo extender la reserva a 2 horas',
          {
            position: 'bottom-left',
            autoClose: 3000,
          }
        )
      }
    } catch (e) {
      toast.error('Error al extender la reserva', {
        position: 'bottom-left',
        autoClose: 3000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return '-'
    const d = new Date(dateStr)
    if (Number.isNaN(d.getTime())) return dateStr
    return d.toLocaleDateString('es-UY', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  const formatTime = (timeStr) => (timeStr ? timeStr.slice(0, 5) : '-')

  const blocksLabel = () => {
    if (!reservation?.blocks) return '1 bloque (1 hora)'
    if (reservation.blocks === 1) return '1 bloque (1 hora)'
    if (reservation.blocks === 2) return '2 bloques (2 horas)'
    return `${reservation.blocks} bloques`
  }

  const canExtend = reservation?.blocks === 1

  return (
    <Modal open={open} onClose={isLoading ? () => {} : onClose}>
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[1px] rounded-2xl">
          <Oval
            height={35}
            width={35}
            color="#052e66"
            secondaryColor="#e5e7eb"
            strokeWidth={4}
            strokeWidthSecondary={4}
            ariaLabel="loading-reservation-info"
          />
        </div>
      )}

      <div className="text-left w-full p-4 sm:p-6 overflow-y-auto sm:max-h-[80vh] max-h-[100vh] scrollbar relative">
        {reservation ? (
          <>
            <div className="flex justify-between items-start gap-3 mb-4">
              <div>
                <h2 className="font-bold text-[#052e66] text-2xl sm:text-3xl">
                  Información de la reserva
                </h2>
                {reservation.studyGroupName && (
                  <p className="text-gray-700 mt-1 text-lg">
                    {reservation.studyGroupName}
                  </p>
                )}
              </div>

              <div className="px-4 py-2 rounded-xl border border-[#0d9b64] bg-[#e6f9f0] text-[#064b34] text-xs sm:text-sm shadow-md">
                {blocksLabel()}
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 shadow-sm">
                <h3 className="text-[#052e66] font-semibold text-lg mb-2">
                  Detalles de la reserva
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
                  <div>
                    <p className="text-sm font-semibold text-blue-900">Fecha</p>
                    <p>{formatDate(reservation.date)}</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-blue-900">
                      Horario
                    </p>
                    <p>
                      {formatTime(reservation.shiftStart)} -{' '}
                      {formatTime(reservation.shiftEnd)}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-blue-900">Sala</p>
                    <p>
                      {reservation.room?.roomName || '-'}
                      {reservation.room?.buildingName
                        ? ` · ${reservation.room.buildingName}`
                        : ''}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-blue-900">
                      Campus
                    </p>
                    <p>{reservation.room?.campus || '-'}</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-blue-900">
                      Estado
                    </p>
                    <p>{reservation.state || '-'}</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-blue-900">
                      Creada el
                    </p>
                    <p>{formatDate(reservation.reservationCreateDate)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 shadow-sm">
                <h3 className="text-[#052e66] font-semibold text-lg mb-2">
                  Bibliotecario asignado
                </h3>

                {reservation.librarian ? (
                  <div>
                    <p className="font-medium text-gray-800">
                      {reservation.librarian.name}{' '}
                      {reservation.librarian.lastName}
                    </p>
                    <p className="text-sm text-gray-600">
                      {reservation.librarian.mail}
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-600 text-sm">
                    No hay bibliotecario asignado.
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col mt-6 sm:flex-row sm:justify-end gap-3">
              {canExtend && (
                <button
                  onClick={handleExtendBlock}
                  disabled={isLoading}
                  className="px-4 py-2 rounded-xl border border-[#0d9b64] bg-[#e6f9f0] text-[#064b34] text-sm shadow-md cursor-pointer hover:bg-[#d4f5e8] disabled:opacity-60 disabled:cursor-not-allowed">
                  Extender a 2 horas
                </button>
              )}

              {!canExtend && (
                <span className="text-xs sm:text-sm text-gray-600 self-start sm:self-center">
                  La reserva ya es de 2 horas.
                </span>
              )}

              <button
                onClick={onClose}
                disabled={isLoading}
                className="w-full sm:w-1/3 py-3 cursor-pointer text-white bg-[#052e66] rounded-xl font-semibold shadow-md hover:bg-[#073c88] transition disabled:opacity-60 disabled:cursor-not-allowed">
                Cerrar
              </button>
            </div>
          </>
        ) : (
          !isLoading && (
            <div className="flex flex-col items-center justify-center gap-4 py-10">
              <p className="text-gray-700 text-center">
                No se encontró información de reserva activa para este grupo.
              </p>

              <button
                onClick={onClose}
                className="px-4 py-2 cursor-pointer text-white bg-[#052e66] rounded-xl font-semibold shadow-md hover:bg-[#073c88] transition">
                Cerrar
              </button>
            </div>
          )
        )}
      </div>
    </Modal>
  )
}
