import {useEffect, useState} from 'react'
import Data from './components/data'
import ModalExpress from './components/modalExpress'
import getGroupMembersService from '../../service/getGroupMembersService'
import patchEmptyReservationService from '../../service/patchEmptyReservation'
import {toast} from 'react-toastify'

export default function ReservationsAvailable({ reservationsToday, handleNewManagedReservation, refreshReservationsToday, managing, setManaging }) {
  const [openExpress, setOpenExpress] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState('')
  const [selectedReservation, setSelectedReservation] = useState('')
  const [selectedGroupMembers, setSelectedGroupMembers] = useState([])

  const selectData = async (reservation) => {
    setSelectedReservation(reservation);
    setSelectedGroup(reservation.studyGroupId);
  }

  useEffect(() => {
    if (selectedGroup === '') {
      return
    } else {
      getGroupMembers();
    }
  }, [selectedGroup])

  useEffect(() => {
    if (selectedGroupMembers.length === 0) {
      return;
    } else {
      patchEmptyReservation();
    }
  }, [selectedGroupMembers])

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
        setSelectedGroupMembers(membersCi)
      }
    }
  }

  const patchEmptyReservation = async () => {
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
      "endDate": endDate,
      "startDate": selectedReservation.date
    }

    console.log(BODY)
    const emptyReservationSanction = await patchEmptyReservationService(BODY);
    if (emptyReservationSanction?.success) {
      setManaging(!managing)
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
  }

  const hayReservas = reservationsToday && reservationsToday.length > 0

  return (
    <>
      <div className="text-xl">
        <div className="sm:flex justify-between sm:items-end items-start w-full sm:pb-4">
          <h2 className="flex ml-1 font-semibold items-end justify-start sm:justify-end text-gray-800 text-2xl">
            Reservas Disponibles
          </h2>

          <div className=" sm:py-0 sm:m-0 my-3 px-1 sm:px-0 text-gray-300">
            <button
              onClick={() => setOpenExpress(true)}
              className="px-4 cursor-pointer sm:w-auto w-full duration-300 text-white bg-[#052e66] border-2 border-[#052e66] rounded-lg font-medium shadow-md hover:bg-[#0b49a1] transition p-2">
              Reserva express
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
                <div className="w-1/5 text-center">Sala</div>
                <div className="w-1/7 text-center">Estado</div>
                <div className="w-1/3 text-center">Acciones</div>
              </div>

              <ul className="w-full overflow-auto scrollbar mt-1">
                {reservationsToday.map((reservation) => (
                  <li key={reservation.studyGroupId}>
                    <Data reserva={reservation}>
                      <button
                        onClick={() => selectData(reservation)}
                        className="font-medium w-1/2 lg:w-auto rounded-md px-3 py-2 sm:py-2 cursor-pointer duration-200 bg-red-100 border border-red-300 text-[#052e66] shadow-md hover:bg-red-50 transition-all">
                        Cancelar <i className="fa-solid fa-xmark "></i>
                      </button>

                      <button
                        onClick={() => handleNewManagedReservation(reservation)}
                        className="font-medium w-1/2 lg:w-auto rounded-md px-3 py-2 sm:py-2 cursor-pointer duration-200 bg-green-100 border border-green-300 text-[#052e66] shadow-md hover:bg-green-50 transition-all">
                        Gestionar <i className="fa-solid fa-check "></i>
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
