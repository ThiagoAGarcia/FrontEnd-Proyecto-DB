import {useEffect, useState} from 'react'
import Data from './components/data'
import ModalExpress from './components/modalExpress'
import getGroupMembersService from '../../service/getGroupMembersService'
import patchEmptyReservationService from '../../service/patchEmptyReservation'
import { toast } from 'react-toastify'

export default function ReservationsAvailable({
  reservationsToday,
  handleNewManagedReservation,
  refreshReservationsToday,
}) {
  const [openExpress, setOpenExpress] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState('')
  const [selectedReservation, setSelectedReservation] = useState('')
  const [groupMembers, setGroupMembers] = useState([])

  const selectData = (reservation) => {
    setSelectedReservation(reservation);
    setSelectedGroup(reservation.studyGroupId);
  }

  useEffect(() => {
    const getGroupMembers = async () => {
      if (selectedGroup === '') {
        return
      } else {
        const groupMembers = await getGroupMembersService(selectedGroup)
        if (groupMembers.success) {
          let membersCi = []
          groupMembers.members.map((member) => {
            membersCi.push(member.ci);
          })
          console.log(membersCi)
          setGroupMembers(membersCi)
        }
      }
    }

    getGroupMembers();
  }, [selectedGroup])

  console.log(groupMembers)

  useEffect(() => {
    let end = new Date();
    end.setMonth(end.getMonth() + 1);
    const year = end.getFullYear();
    const month = String(end.getMonth() + 1).padStart(2, '0');
    const day = String(end.getDate()).padStart(2, '0');
    const endDate = `${year}-${month}-${day}`;
    const BODY = {
      "studyGroupId": selectedGroup,
      "studyRoomId": selectedReservation.studyRoomId,
      "shift": selectedReservation.shift,
      "members": groupMembers,
      "endDate": endDate
    }

    const emptyReservationSanction = patchEmptyReservationService(BODY);
    if (emptyReservationSanction.success) {
      toast.success(emptyReservationSanction.description, {
        position: 'bottom-left',
        autoClose: 2500,
      })
    } else {
      toast.warning(emptyReservationSanction.error, {
        position: 'bottom-left',
        autoClose: 2500,
      })
    }
  }, [groupMembers])


  const hayReservas = reservationsToday && reservationsToday.length > 0

  return (
    <>
      <div className="text-xl">
        <div className="sm:flex justify-between items-center w-full sm:pb-3">
          <h2 className="ml-1 font-semibold text-gray-800 text-2xl">
            Reservas Disponibles
          </h2>

          <button
            onClick={() => setOpenExpress(true)}
            className="bg-[#052e66] text-white px-5 p-2 rounded-xl cursor-pointer text-lg">
            Reserva express
          </button>
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
              {reservationsToday.map((reservation) => (
                <li key={reservation.studyGroupId}>
                  <Data reserva={reservation}>
                    <button
                      onClick={() => selectData(reservation)}
                      title="Cancelar reserva"
                      className="border-1 rounded-md sm:mx-1 px-2 mx-0.5 p-0.5 bg-red-100 cursor-pointer hover:bg-red-50 transition-colors">
                      <i className="fa-solid fa-xmark text-[#052e66]"></i>
                    </button>
                    <button
                      onClick={() => handleNewManagedReservation(reservation)}
                      title="Aceptar reserva"
                      className="border-1 rounded-md sm:mx-1 px-2 mx-0.5 p-0.5 bg-green-100 cursor-pointer hover:bg-green-50 transition-colors">
                      <i className="fa-solid fa-check text-[#052e66]"></i>
                    </button>
                    <button
                      title="Más información"
                      className="border-1 rounded-md sm:mx-1 mx-0.5 p-0.5 px-2 font-semibold bg-gray-300 hover:bg-gray-200 transition-colors cursor-pointer">
                      <i className="fa-solid fa-arrow-right text-[#052e66]"></i>
                    </button>
                  </Data>
                </li>
              ))}
            </ul>
            </>
          ) : (
            <span className="font-medium text-2xl text-gray-600">
              No hay reservas disponibles hoy
            </span>
          )}
        </div>
      </div>

      <ModalExpress
        open={openExpress}
        onClose={() => setOpenExpress(false)}
        onCreated={refreshReservationsToday}
      />
    </>
  )
}
