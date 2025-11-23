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
            <div className="sm:flex justify-between items-center w-full sm:pb-3">
                <h2 className="ml-1 font-semibold text-gray-800 text-2xl">
                    Reservas Finalizadas
                </h2>
            </div>
            <div
                className={`w-full bg-white shadow-md rounded-2xl p-2 flex flex-col border border-gray-400 ${!hayReservas ? 'justify-center items-center h-80' : ''
                    }`}>

                {hayReservas ? (
                    <>
                        <div className="w-full flex justify-between text-gray-700 font-semibold px-2 pb-1 border-b border-gray-300 md:text-lg text-base">
                            <div className="w-1/2 text-center">Turno</div>
                            <div className="w-1/4 text-center">Salas</div>
                            <div className="w-1/4 text-center">Estado</div>
                            <div className="w-1/2 sm:w-1/3 text-center">Acciones</div>
                        </div>

                        <ul className="w-full overflow-auto scrollbar mt-1">
                            {finishedReservations &&
                                finishedReservations.map((reservation) => (
                                    <li key={reservation.studyGroupId}>
                                        <Data reserva={reservation}>
                                            <button
                                                onClick={() =>
                                                    selectGroup(reservation.studyGroupId)
                                                }
                                                title="Nueva sanción"
                                                className="border-1 rounded-md sm:mx-1 px-2 mx-0.5 p-0.5 bg-gray-300 hover:bg-gray-200  cursor-pointer transition-colors">                                                <i className="fa-solid fa-circle-exclamation text-[#052e66]"></i>
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