import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Oval } from 'react-loader-spinner'
import 'react-toastify/dist/ReactToastify.css'

import Modal from '../../../components/modal.jsx'

import postReservationExpressService from '../../../service/postReservationExpressService.jsx'
import getAllGroupsService from '../../../service/getAllGroupsService.jsx'
import getRoomShiftTodayService from '../../../service/getRoomShiftToday.jsx'

const ModalExpress = ({ open, onClose, selectedGroup, onCreated }) => {
  const [groupId, setGroupId] = useState(selectedGroup || null)

  const [groups, setGroups] = useState([])
  const [searchText, setSearchText] = useState('')

  const [salas, setSalas] = useState([])
  const [turnos, setTurnos] = useState([])
  const [selectedSala, setSelectedSala] = useState(null)
  const [selectedTurno, setSelectedTurno] = useState(null)

  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const today = new Date()
  const year = today.getFullYear()
  const month = (today.getMonth() + 1).toString().padStart(2, '0')
  const day = today.getDate().toString().padStart(2, '0')

  const resetForm = () => {
    setGroupId(selectedGroup || null)
    setGroups([])
    setSearchText('')
    setSalas([])
    setTurnos([])
    setSelectedSala(null)
    setSelectedTurno(null)
    setIsLoading(false)
    setErrorMsg('')
  }

  const cargarGrupos = async (text = '') => {
    try {
      const res = await getAllGroupsService(text)
      if (res?.success) {
        setGroups(res.groups || [])
      } else {
        toast.error(res?.description || 'Error al obtener grupos', {
          position: 'bottom-left',
          autoClose: 3000,
        })
      }
    } catch (e) {
      toast.error('Error de conexión al obtener grupos', {
        position: 'bottom-left',
        autoClose: 3000,
      })
    }
  }

  useEffect(() => {
    if (!open) return
    resetForm()
    cargarGrupos('')
  }, [open])

  useEffect(() => {
    if (!open) return

    let cancelled = false

    const fetchData = async () => {
      const roomToSend = selectedSala ?? 'null'
      const shiftToSend = selectedTurno ?? 'null'

      try {
        const res = await getRoomShiftTodayService(shiftToSend, roomToSend)

        if (cancelled) return

        if (!res?.success) {
          setErrorMsg(res?.description || 'Error al obtener información.')
          setSalas([])
          setTurnos([])
          return
        }

        setErrorMsg('')
        if (Array.isArray(res.salas)) setSalas(res.salas)
        if (Array.isArray(res.turnos)) setTurnos(res.turnos)
      } catch (err) {
        if (cancelled) return
        setErrorMsg('Error de conexión con el servidor.')
        setSalas([])
        setTurnos([])
      }
    }

    fetchData()

    return () => {
      cancelled = true
    }
  }, [selectedSala, selectedTurno, open])

  const toggleSala = (roomId) => {
    if (isLoading) return
    setSelectedSala((prev) => (prev === roomId ? null : roomId))
  }

  const toggleTurno = (shiftId) => {
    if (isLoading) return
    setSelectedTurno((prev) => (prev === shiftId ? null : shiftId))
  }

  const toggleGroup = (id) => {
    if (isLoading) return
    setGroupId((prev) => (prev === id ? null : id))
  }

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchText(value)
    cargarGrupos(value)
  }

  const crearReservaExpress = async () => {
    if (isLoading) return

    const finalGroupId = groupId || selectedGroup

    if (!finalGroupId) {
      toast.error('Debes seleccionar un grupo de estudio', {
        position: 'bottom-left',
        autoClose: 3000,
      })
      return
    }

    if (!selectedSala) {
      toast.error('La sala es obligatoria', {
        position: 'bottom-left',
        autoClose: 3000,
      })
      return
    }

    if (!selectedTurno) {
      toast.error('El turno es obligatorio', {
        position: 'bottom-left',
        autoClose: 3000,
      })
      return
    }

    try {
      setIsLoading(true)

      const BODY = {
        studyGroupId: finalGroupId,
        studyRoomId: selectedSala,
        shiftId: selectedTurno,
      }

      const resp = await postReservationExpressService(BODY)

      if (!resp?.success) {
        toast.error(resp?.description || 'Error creando la reserva', {
          position: 'bottom-left',
          autoClose: 3000,
        })
        return
      }

      toast.success('Reserva express creada con éxito', {
        position: 'bottom-left',
        autoClose: 2500,
      })

      if (onCreated) onCreated()
      onClose()
      resetForm()
    } catch (err) {
      toast.error('Error de conexión con el servidor', {
        position: 'bottom-left',
        autoClose: 3000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!open) return null

  return (
    <Modal
      open={open}
      onClose={
        isLoading
          ? () => { }
          : () => {
            onClose()
            resetForm()
          }
      }>
      <div className="relative sm:max-h-[80vh] max-h-[100vh] w-full p-0 sm:p-6 rounded-xl">
        {isLoading && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-20 rounded-xl">
            <Oval
              height={40}
              width={40}
              color="#052e66"
              secondaryColor="#e5e7eb"
              strokeWidth={4}
              strokeWidthSecondary={4}
              ariaLabel="loading-express-reservation"
            />
          </div>
        )}

        <h2 className="font-bold text-[#052e66] text-3xl mb-6">
          Reserva express
        </h2>

        <div className="w-full bg-gray-100/70 shadow-xl shadow-blue-50 border border-gray-200 rounded-2xl p-6">
          <section className="sm:h-[52vh] h-[68vh] overflow-y-auto scroll-ucu p-2">
            <p className="text-sm text-gray-600 mb-4">
              La reserva se realizará para hoy:{' '}
              <span className="font-semibold">
                {day}/{month}/{year}
              </span>
            </p>

            <div className="mb-4">
              <div className='flex flex-col mb-4 sm:flex-row items-start sm:items-end justify-between'>
                <label className="font-medium text-[#052e66] text-lg block">
                  Grupos de estudio
                </label>
                <input
                  type="text"
                  value={searchText}
                  onChange={handleSearchChange}
                  placeholder="Buscar por nombre de grupo"
                  className="bg-white border rounded-xl p-2 w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-[#052e66]/40"
                  disabled={isLoading}
                />
              </div>

              <div className="bg-white shadow-inner border border-gray-300 rounded-2xl p-4 max-h-68 overflow-y-auto">
                {groups.length === 0 && (
                  <p className="text-sm text-gray-500">
                    No se encontraron grupos.
                  </p>
                )}
                {groups.map((g) => (
                  <label
                    key={g.studyGroupId}
                    onClick={(e) => {
                      e.preventDefault()
                      toggleGroup(g.studyGroupId)
                    }}
                    className={`flex items-center justify-between gap-4 p-3 my-2 rounded-xl cursor-pointer shadow-sm transition-all ${groupId === g.studyGroupId
                      ? 'bg-gradient-to-t from-blue-100 to-blue-50 border-none text-[#052e66] shadow-[#4379c5] scale-[1.005]'
                      : 'bg-white border border-gray-300 hover:shadow-md'
                      } ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}>
                    <input
                      type="radio"
                      name="grupo"
                      className="hidden"
                      value={g.studyGroupId}
                      checked={groupId === g.studyGroupId}
                      readOnly
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-800">
                        {g.studyGroupName}
                      </span>
                      <span className="text-xs text-gray-500">
                        Líder: {g.leaderName} — Estado: {g.status}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-xl">
                {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

              <div>
                <h3 className="font-semibold text-[#052e66] text-xl mb-2">
                  Salas
                </h3>
                <div className="bg-gray-50 shadow-inner border border-gray-300 rounded-2xl p-4 max-h-72 overflow-y-auto">
                  {salas.length === 0 ? (
                    <p className="text-sm text-gray-500">
                      No hay salas disponibles para los filtros actuales.
                    </p>
                  ) : (
                    <>
                      {salas.map((sala) => (
                        <label
                          key={sala.roomId}
                          onClick={(e) => {
                            e.preventDefault()
                            toggleSala(sala.roomId)
                          }}
                          className={`flex items-center gap-4 p-4 my-4 rounded-xl cursor-pointer shadow-md transition-all ${selectedSala === sala.roomId
                            ? 'bg-gradient-to-t from-blue-100 to-blue-50 border-none text-[#052e66] shadow-[#4379c5] scale-[1.01]'
                            : 'bg-gray-50 border border-gray-300 hover:shadow-lg'
                            } ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}>
                          <input
                            type="radio"
                            name="sala"
                            className="hidden"
                            value={sala.roomId}
                            checked={selectedSala === sala.roomId}
                            readOnly
                          />
                          <div className="flex flex-col">
                            <span className="text-lg font-semibold">
                              {sala.roomName}
                            </span>
                          </div>
                          <span className="text-sm text-gray-600">
                            Capacidad: {sala.capacity}
                          </span>
                        </label>
                      ))}
                    </>
                  )}
                </div>
              </div>


              <div>
                <h3 className="font-semibold text-[#052e66] text-xl mb-2">
                  Turnos
                </h3>
                <div className="bg-gray-50 shadow-inner border border-gray-300 rounded-2xl p-4 max-h-72 overflow-y-auto">
                  {turnos.length === 0 ? (
                    <p className="text-sm text-gray-500">
                      No hay turnos disponibles para los filtros actuales.
                    </p>
                  ) : (
                    turnos.map((turno) => (
                    <label
                      key={turno.shiftId}
                      onClick={(e) => {
                        e.preventDefault()
                        toggleTurno(turno.shiftId)
                      }}
                      className={`flex items-center gap-4 p-4 my-4 rounded-xl cursor-pointer shadow-md transition-all ${selectedTurno === turno.shiftId
                        ? 'bg-gradient-to-t from-blue-100 to-blue-50 border-none text-[#052e66] shadow-[#4379c5] scale-[1.01]'
                        : 'bg-gray-50 border border-gray-300 hover:shadow-lg'
                        } ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}>
                      <input
                        type="radio"
                        name="turno"
                        className="hidden"
                        value={turno.shiftId}
                        checked={selectedTurno === turno.shiftId}
                        readOnly
                      />
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-800">
                          {turno.start} - {turno.end}
                        </span>
                      </div>
                    </label>
                  )))}
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-5 justify-end">
          <button
            onClick={crearReservaExpress}
            disabled={isLoading}
            className="bg-[#052e66] cursor-pointer text-white w-full sm:w-1/3 py-3 rounded-xl shadow-md hover:bg-[#073c88] transition disabled:opacity-60 disabled:cursor-not-allowed">
            Crear reserva
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

export default ModalExpress
