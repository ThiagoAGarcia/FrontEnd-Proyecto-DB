import { useState, useEffect } from "react";
import ModalSanction from "./components/modalSanction";
import Data from "./components/data";
import getGroupMembersService from '../../service/getGroupMembersService';

export default function FinishedReservations({ finishedReservations }) {
    const hayReservas = Array.isArray(finishedReservations) && finishedReservations.length > 0;
    const [selectedGroup, setSelectedGroup] = useState('');
    const [groupMembers, setGroupMembers] = useState(null);
    const [sanctionOpen, setSanctionOpen] = useState(false);

    const selectGroup = (groupId) => {
        setSanctionOpen(true);
        setSelectedGroup(groupId);
    }

    useEffect(() => {
        const getGroupMembers = async () => {
            if (selectedGroup === '') {
                return
            } else {
                const groupMembers = await getGroupMembersService(selectedGroup)
                if (groupMembers.success) {
                    setGroupMembers(groupMembers.members)
                }
            }
        }

        getGroupMembers();
    }, [selectedGroup])

    return (
        <div className="text-xl">
            <div className="sm:flex justify-between sm:items-end items-start w-full sm:pb-4">
                <h2 className="flex ml-1 font-semibold items-end justify-start sm:justify-end text-gray-800 text-2xl">
                    Reservas Finalizadas
                </h2>
            </div>
            <div className={`w-full bg-white shadow-md rounded-2xl p-2 flex flex-col border border-gray-400 ${!hayReservas ? 'justify-center items-center h-80' : '' }`}>
                {hayReservas ? (
                    <>
                        <div className="hidden lg:flex w-full text-gray-600 font-medium px-2 pb-2 border-b border-gray-300">
                            <div className="w-1/3 text-center">Turno</div>
                            <div className="w-1/5 text-center">Salas</div>
                            <div className="w-1/7 text-center">Estado</div>
                            <div className="w-1/3 sm:w-1/3 text-center">Acciones</div>
                        </div>

                        <ul className="w-full overflow-auto scrollbar mt-1">
                            {finishedReservations &&
                                finishedReservations.map((reservation) => (
                                    <li key={reservation.studyGroupId}>
                                        <Data reserva={reservation}>

                                            <button
                                                onClick={() => selectGroup(reservation.studyGroupId)}
                                                className="font-medium sm:w-1/2 w-full lg:w-auto rounded-md px-3 py-2 sm:py-2 cursor-pointer duration-200 bg-gray-300 hover:bg-gray-200 border border-gray-300 text-[#052e66] shadow-md transition-all">
                                                Colocar sanción <i className="fa-solid fa-circle-exclamation "></i>
                                            </button>
                                        </Data>
                                    </li>
                                ))}
                        </ul>
                        <ModalSanction
                            open={sanctionOpen}
                            onClose={() => setSanctionOpen(false)}
                            groupMembers={groupMembers}
                        />
                    </>
                ) : (
                    <span className="font-medium text-2xl text-gray-600">
                        Niguna reserva ha finalizado hoy
                    </span>
                )}
            </div>
        </div>
    )
}