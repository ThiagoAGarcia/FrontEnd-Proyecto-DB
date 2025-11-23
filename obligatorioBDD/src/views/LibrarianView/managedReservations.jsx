import Data from './components/data'
import patchFinishedReservationsService from '../../service/patchFinishedReservationsService'
import {useState} from 'react'
import Modal from '../../components/modal'
import {toast} from 'react-toastify'

export default function ReservationsAvailable({
  managedReservations,
  handleRestoreAvailableReservation,
  managing,
  setManaging,
}) {
  const hayReservas = managedReservations && managedReservations.length > 0

  const [doubleCheckOpen, setDoubleCheckOpen] = useState(false)
  const [shift, setShift] = useState('')
  const turnos = [
    {id: 1, label: '08:00'},
    {id: 2, label: '09:00'},
    {id: 3, label: '10:00'},
    {id: 4, label: '11:00'},
    {id: 5, label: '12:00'},
    {id: 6, label: '13:00'},
    {id: 7, label: '14:00'},
    {id: 8, label: '15:00'},
    {id: 9, label: '16:00'},
    {id: 10, label: '17:00'},
    {id: 11, label: '18:00'},
    {id: 12, label: '19:00'},
    {id: 13, label: '20:00'},
    {id: 14, label: '21:00'},
    {id: 15, label: '22:00'},
  ]

  const handleFinishManagedReservations = async () => {
    const BODY = {
      'shift': shift,
    }

    const finishedReservations = await patchFinishedReservationsService(BODY)
    if (finishedReservations.success) {
      setManaging(!managing)
      toast.success(finishedReservations.description, {
        position: 'bottom-left',
        autoClose: 2500,
      })
      setDoubleCheckOpen(false)
    } else {
      toast.error(finishedReservations.description)
    }
  }

  return (
    <div className="text-xl">
      <div className="sm:flex justify-between sm:items-end items-start w-full sm:pb-4">
        <h2 className="flex ml-1 font-semibold items-end justify-start sm:justify-end text-gray-800 text-2xl">
          Reservas Gestionadas
        </h2>

        <div className=" sm:py-0 sm:m-0 my-3 px-1 sm:px-0 text-gray-300">
          <button
            onClick={() => {
              setDoubleCheckOpen(true)
              setShift('')
            }}
            className="px-4 cursor-pointer sm:w-auto w-full duration-300 text-white bg-[#052e66] border-2 border-[#052e66] rounded-lg font-medium shadow-md hover:bg-[#0b49a1] transition p-2">
            Finalizar reservas
          </button>
        </div>
      </div>

      <div
        className={`w-full bg-white shadow-md rounded-2xl p-2 flex flex-col border border-gray-400 ${
          !hayReservas ? 'justify-center items-center h-80' : ''
        }`}>
        {hayReservas ? (
          <>
            <div className="hidden lg:flex w-full text-gray-600 font-medium px-2 pb-2 border-b border-gray-300">
              <div className="w-1/3 text-center">Turno</div>
              <div className="w-1/5 text-center">Salas</div>
              <div className="w-1/7 text-center">Estado</div>
              <div className="w-1/3 sm:w-1/3 text-center">Acciones</div>
            </div>

            <ul className="w-full overflow-auto scrollbar mt-1">
              {managedReservations.length !== 0 &&
                managedReservations.map((reservation) => (
                  <li key={reservation.studyGroupId}>
                    <Data reserva={reservation}>
                      <button
                        onClick={() =>
                          handleRestoreAvailableReservation(reservation)
                        }
                        className="font-medium w-1/2 lg:w-auto rounded-md px-3 py-2 sm:py-2 cursor-pointer duration-200 bg-[#c9fffb]  border border-[#b8ebd6] text-[#052e66] shadow-md hover:bg-[#d9fffd] transition-all">
                        <i className="fa-solid fa-arrow-left "></i> No Gestionar
                      </button>

                      <button
                        onClick={() => handleNewManagedReservation(reservation)}
                        className="font-medium w-1/2 lg:w-auto rounded-md px-3 py-2 sm:py-2 cursor-pointer duration-200 bg-red-100 border border-red-300 text-[#052e66] shadow-md hover:bg-red-50 transition-all">
                        Cancelar <i className="fa-solid fa-xmark "></i>
                      </button>
                    </Data>
                  </li>
                ))}
            </ul>
            <Modal
              open={doubleCheckOpen}
              onClose={() => setDoubleCheckOpen(false)}>
              <div className="relative sm:max-h-[80vh] max-h-[100vh] w-full p-0 sm:p-6 rounded-xl">
                <h2 className="text-2xl font-bold text-[#052e66] text-center mb-4">
                  Finalizar Reservas
                </h2>
                <p className="text-center text-gray-700 mb-6">
                  Selecciona el turno correspondiente a las reservas que querés
                  finalizar.
                </p>
                <div className="w-full bg-gray-100/70 shadow-xl border border-gray-200 rounded-2xl p-6">
                  <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {turnos.map((shiftObj) => (
                      <label
                        key={shiftObj.id}
                        className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer shadow-md transition-all ${
                          shift === shiftObj.id.toString()
                            ? 'bg-gradient-to-t from-blue-100 to-blue-50 border-none text-[#052e66] shadow-[#4379c5] scale-[1.01]'
                            : 'bg-gray-50 border border-gray-300 hover:shadow-lg'
                        }`}>
                        <input
                          type="radio"
                          name="shift"
                          value={shiftObj.id}
                          onChange={(e) => setShift(e.target.value)}
                          className="hidden"
                        />
                        <span className="font-semibold text-blue-900">
                          {shiftObj.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-5 justify-end">
                <button
                  onClick={() => handleFinishManagedReservations()}
                  className="bg-[#052e66] cursor-pointer text-white w-full sm:w-1/3 py-3 rounded-xl shadow-md hover:bg-[#073c88] transition disabled:opacity-60 disabled:cursor-not-allowed">
                  Finalizar Reservas
                </button>

                <button
                  onClick={() => setDoubleCheckOpen(false)}
                  className="sm:hidden inline border border-[#052e66] cursor-pointer text-[#052e66] w-full sm:w-1/3 py-3 rounded-xl shadow-md hover:bg-[#eef3fb] transition disabled:opacity-60 disabled:cursor-not-allowed">
                  Cancelar
                </button>
              </div>
            </Modal>
          </>
        ) : (
          <span className="font-medium text-2xl text-gray-600">
            No se ha gestionado ninguna reserva hoy
          </span>
        )}
      </div>
    </div>
  )
}
