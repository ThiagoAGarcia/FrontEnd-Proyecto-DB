import Data from './components/data'
import patchFinishedReservationsService from '../../service/patchFinishedReservationsService';
import { useState } from 'react';
import Modal from '../../components/modal';
import { toast } from 'react-toastify';

export default function ReservationsAvailable({ managedReservations, handleRestoreAvailableReservation, managing, setManaging }) {
  const hayReservas = managedReservations && managedReservations.length > 0

  const [doubleCheckOpen, setDoubleCheckOpen] = useState(false);
  const [shift, setShift] = useState('');

  console.log(managedReservations)

  const handleFinishManagedReservations = async () => {
    console.log(shift)
    const BODY = {
      "shift": shift
    }

    console.log(BODY)
    const finishedReservations = await patchFinishedReservationsService(BODY)
    if (finishedReservations.success) {
      setManaging(!managing)
      toast.success(finishedReservations.description, {
        position: 'bottom-left',
        autoClose: 2500,
      })
      setDoubleCheckOpen(false);
    } else {
      console.log(finishedReservations.description)
    }
  }

  return (
    <div className="text-xl">
      <div className="sm:flex justify-between sm:items-end items-start w-full sm:pb-4">

        <h2 className="flex ml-1 font-semibold items-end justify-start sm:justify-end text-gray-800 text-2xl">
          Reservas Gestionadas
        </h2>

        <div className=" sm:py-0 sm:m-0 my-3 px-1 sm:px-0 text-gray-300">
          <button onClick={() => setDoubleCheckOpen(true)} className="px-4 cursor-pointer sm:w-auto w-full duration-300 text-white bg-[#052e66] border-2 border-[#052e66] rounded-lg font-medium shadow-md hover:bg-[#0b49a1] transition p-2">
            Finalizar reservas
          </button>
        </div>
      </div>

      <div
        className={`w-full bg-white shadow-md rounded-2xl p-2 flex flex-col border border-gray-400 ${!hayReservas ? 'justify-center items-center h-80' : ''
          }`}>
        {hayReservas ? (
          <>
            <div className="w-full flex justify-between text-gray-700 font-semibold px-2 pb-1 border-b border-gray-300 md:text-lg text-base">
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
                        onClick={() => handleRestoreAvailableReservation(reservation)}
                        className="font-medium w-1/2 lg:w-auto rounded-md px-3 py-2 sm:py-1 cursor-pointer duration-200 bg-red-100 border border-red-300 text-[#052e66] shadow-md hover:bg-red-50 transition-all">
                        No Gestionar <i className="fa-solid fa-arrow-left "></i>
                      </button>

                      <button
                        onClick={() => handleNewManagedReservation(reservation)}
                        className="font-medium w-1/2 lg:w-auto rounded-md px-3 py-2 sm:py-1 cursor-pointer duration-200 bg-red-100 border border-red-300 text-[#052e66] shadow-md hover:bg-red-50 transition-all">
                        Cancelar <i className="fa-solid fa-xmark "></i>
                      </button>



                    </Data>
                  </li>
                ))}
            </ul>
            <Modal open={doubleCheckOpen} onClose={() => setDoubleCheckOpen(false)}>
              <div className='flex flex-col items-center p-2'>
                <div className='flex items-center'>
                  <h2>
                    Elige el horario de las reservas terminadas
                  </h2>
                </div>

                <div>
                  <label className="font-medium text-gray-700">Turno</label>
                  <select
                    id='shifts'
                    onChange={(e) => setShift(e.target.value)}
                  >
                    <option value='1'>08:00</option>
                    <option value='2'>09:00</option>
                    <option value='3'>10:00</option>
                    <option value='4'>11:00</option>
                    <option value='5'>12:00</option>
                    <option value='6'>13:00</option>
                    <option value='7'>14:00</option>
                    <option value='8'>15:00</option>
                    <option value='9'>16:00</option>
                    <option value='10'>17:00</option>
                    <option value='11'>18:00</option>
                    <option value='12'>19:00</option>
                    <option value='13'>20:00</option>
                    <option value='14'>21:00</option>
                    <option value='15'>22:00</option>
                  </select>
                </div>

                <div className='w-full flex flex-row justify-center'>
                  <button onClick={() => handleFinishManagedReservations()} className='w-1/4 bg-blue-900 rounded-md p-2 m-1 text-white font-semibold hover:bg-blue-800 cursor-pointer transition-colors'>Aceptar</button>
                  <button onClick={() => setDoubleCheckOpen(false)} className='w-1/4 bg-red-500 border-2 rounded-md p-2 m-1 text-white font-semibold hover:bg-red-600 cursor-pointer transition-colors'>Cancelar</button>
                </div>
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
