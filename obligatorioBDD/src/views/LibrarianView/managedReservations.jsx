import Data from './components/data'
import patchFinishedReservationsService from '../../service/patchFinishedReservationsService';
import { useState } from 'react';
import Modal from '../../components/modal';
import { toast } from 'react-toastify';

export default function ReservationsAvailable({ managedReservations, handleRestoreAvailableReservation, managing, setManaging }) {
  const hayReservas = managedReservations && managedReservations.length > 0

  const [doubleCheck, setDoubleCheck] = useState(true);
  const [doubleCheckOpen, setDoubleCheckOpen] = useState(false);

  const handleDoubleCheck = () => {
    if (doubleCheck) {
      setDoubleCheckOpen(true);
    }
  }

  console.log(managedReservations)

  const handleFinishManagedReservations = async () => {
    const finishedReservations = await patchFinishedReservationsService()
    if (finishedReservations.success) {
      setManaging(!managing)
      toast.success(finishedReservations.description, {
        position: 'bottom-left',
        autoClose: 2500,
      })
    } else {
      console.log(finishedReservations.description)
    }
  }

  return (
    <div className="text-xl">
      <div className="sm:flex justify-between items-center w-full sm:pb-3">
        <h2 className="ml-1 font-semibold text-gray-800 text-2xl">
          Reservas Gestionadas
        </h2>

        <div className="py-3 sm:py-0 px-1 sm:px-0 sm:p-4 text-gray-300 sm:w-1/4">
          <button onClick={() => handleFinishManagedReservations()}className="mt-4 w-full py-1 cursor-pointer duration-300 text-white bg-[#052e66] border-2 border-[#052e66] rounded-xl font-semibold shadow-md hover:bg-[#0b49a1] transition">
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
            <div className="w-full flex justify-between text-gray-700 font-semibold px-2 pb-1 border-b border-gray-300 md:text-lg text-base">
              <div className="w-1/2 text-center">Turno</div>
              <div className="w-1/4 text-center">Salas</div>
              <div className="w-1/4 text-center">Edificio</div>
              <div className="w-1/4 text-center">Estado</div>
              <div className="w-1/2 sm:w-1/3 text-center">Acciones</div>
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
                        title="Dejar de gestionar"
                        className="border-1 rounded-md sm:mx-1 px-2 mx-0.5 p-0.5 bg-red-100 cursor-pointer hover:bg-red-50 transition-colors">
                        <i className="fa-solid fa-arrow-left text-[#052e66]"></i>
                      </button>
                      <button
                        title="Información reserva"
                        className="border-1 rounded-md sm:mx-1 px-2 mx-0.5 p-0.5 bg-gray-300 hover:bg-gray-200  cursor-pointer transition-colors">
                        <i className="fa-solid fa-circle-exclamation text-[#052e66]"></i>
                      </button>
                    </Data>
                  </li>
                ))}
            </ul>
            <Modal open={doubleCheckOpen} onClose={() => setDoubleCheckOpen(false)}>
              <div className='flex flex-col items-center p-2'>
                <div className='flex items-center'>
                  <h2>
                  ¿Estás seguro que quieres finalizar
                  <br></br>
                  todas las reservas del turno de las {}?
                  </h2>
                </div>
                
                <div className='w-full flex flex-row justify-center'>
                  <button type='submit' onClick={() => handleFinishManagedReservations()} className='w-1/4 bg-blue-900 rounded-md p-2 m-1 text-white font-semibold hover:bg-blue-800 cursor-pointer transition-colors'>Aceptar</button>
                  <button onClick={() => setDoubleCheckOpen(false)} className='w-1/4 bg-red-500 border-2 rounded-md p-2 m-1 text-white font-semibold hover:bg-red-600 cursor-pointer transition-colors'>Cancelar</button>
                </div>
                <form onSubmit={() => setDoubleCheckOpen(false)}>
                  <input type='checkbox' name='remember'/>
                  <label htmlFor='remember'>No volver a mostrar</label>
                </form>
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
