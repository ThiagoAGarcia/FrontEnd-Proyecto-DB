import Modal from '../../components/Modal'
import { Oval } from 'react-loader-spinner'
import { useState } from 'react'
import createStudyRoom from '../../service/createStudyRoom'
import { toast } from 'react-toastify'

export default function CreateSalaModal({ open, onClose, selectedBuilding }) {
  const [isLoading, setIsLoading] = useState(false)
  const [roomName, setRoomName] = useState('')
  const [capacity, setCapacity] = useState('')
  const [type, setType] = useState('')
  const [errores, setErrores] = useState({})

  const resetForm = () => {
    setRoomName('')
    setCapacity('')
    setType('')
    setErrores({})
  }

  const validarFormulario = async () => {
    if (isLoading) return

    const e = {}
    const capNumber = Number(capacity)

    if (!roomName.trim() || roomName.trim().length < 4)
      e.roomName = 'Nombre inválido, es muy corto'

    if (!capNumber || capNumber <= 3)
      e.capacity = 'La capacidad debe ser mayor a 3'

    if (!type)
      e.type = 'Seleccione un tipo de sala'

    if (!selectedBuilding)
      e.building = 'No se ha seleccionado un edificio'

    setErrores(e)
    if (Object.keys(e).length > 0) return

    const body = {
      roomName: roomName.trim(),
      buildingName: selectedBuilding,
      capacity: capNumber,
      roomType: type,
    }

    try {
      setIsLoading(true)
      const resp = await createStudyRoom(body)

      if (resp.success) {
        toast.success(resp.description || 'Sala creada correctamente', {
          position: 'bottom-left',
          autoClose: 2500,
        })
        resetForm()
        onClose()
      } else {
        toast.error(resp.description || 'Error al crear la sala', {
          position: 'bottom-left',
          autoClose: 3000,
        })
      }
    } catch {
      toast.error('Error de conexión con el servidor', {
        position: 'bottom-left',
        autoClose: 3000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal
      open={open}
      onClose={
        isLoading
          ? () => {}
          : () => {
              onClose()
              resetForm()
            }
      }>
      <div className="relative max-h-screen sm:max-h-[60vh] w-full p-4 sm:p-6 pr-8 rounded-xl">
        {isLoading && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-20 rounded-xl">
            <Oval
              height={40}
              width={40}
              color="#052e66"
              secondaryColor="#e5e7eb"
              strokeWidth={4}
              strokeWidthSecondary={4}
              ariaLabel="loading-create-room"
            />
          </div>
        )}

        <h2 className="font-bold text-[#052e66] text-3xl mb-6">Crear sala</h2>

        <div className="w-full bg-white shadow-md rounded-2xl p-4 flex flex-col border border-gray-300">
          <section className="sm:h-[35vh] h-[40vh] overflow-y-auto scroll-ucu p-2">
            <div className="mb-3">
              <label className="font-medium">Nombre de la sala</label>
              <input
                value={roomName}
                onChange={(e) => !isLoading && setRoomName(e.target.value)}
                disabled={isLoading}
                className="bg-gray-50 border rounded-xl p-2 w-full disabled:opacity-60 disabled:cursor-not-allowed"
              />
              {errores.roomName && (
                <p className="text-red-600 text-xs">{errores.roomName}</p>
              )}
            </div>

            <div className="mb-3">
              <label className="font-medium">Capacidad</label>
              <input
                type="number"
                value={capacity}
                onChange={(e) => !isLoading && setCapacity(e.target.value)}
                disabled={isLoading}
                className="bg-gray-50 border rounded-xl p-2 w-full disabled:opacity-60 disabled:cursor-not-allowed"
              />
              {errores.capacity && (
                <p className="text-red-600 text-xs">{errores.capacity}</p>
              )}
            </div>

            <div className="mb-3">
              <label className="font-medium">Tipo</label>
              <select
                value={type}
                onChange={(e) => !isLoading && setType(e.target.value)}
                disabled={isLoading}
                className="bg-gray-50 border rounded-xl p-2 w-full disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <option value="">Seleccione un tipo para la sala</option>
                <option value="Libre">Libre</option>
                <option value="Posgrado">Posgrado</option>
                <option value="Docente">Docente</option>
              </select>
              {errores.type && (
                <p className="text-red-600 text-xs">{errores.type}</p>
              )}
            </div>

            {errores.building && (
              <p className="text-red-600 text-xs">{errores.building}</p>
            )}
          </section>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-5 justify-end">
          <button
            onClick={validarFormulario}
            disabled={isLoading}
            className="bg-[#052e66] cursor-pointer text-white w-full sm:w-1/3 py-3 rounded-xl shadow-md hover:bg-[#073c88] transition disabled:opacity-60 disabled:cursor-not-allowed">
            Crear sala
          </button>

          <button
            onClick={() => {
              if (isLoading) return
              onClose()
              resetForm()
            }}
            disabled={isLoading}
            className="border cursor-pointer border-[#052e66] text-[#052e66] w-full sm:w-1/3 py-3 rounded-xl shadow-md hover:bg-[#eef3fb] transition disabled:opacity-60 disabled:cursor-not-allowed">
            Cancelar
          </button>
        </div>
      </div>
    </Modal>
  )
}
