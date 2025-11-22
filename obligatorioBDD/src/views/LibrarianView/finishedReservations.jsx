import { useState, useEffect } from "react";
import ModalSanction from "./components/modalSanction";
import Data from './components/data'

export default function FinishedReservations({ finishedReservations }) {
    const hayReservas = finishedReservations.length > 0;
    const [selectedGroup, setSelectedGroup] = useState('');
    const [selectedGroupData, setSelectedGroupData] = useState(null);
    const [sanctionOpen, setSanctionOpen] = useState(false);

    const selectGroup = (groupId) => {
        setInfoOpen(true);
        setSelectedGroup(groupId);
    }

    console.log(finishedReservations)

    useEffect(() => {
        const getGroupData = async () => {
            if (selectedGroup === '') {
                return
            } else {
                const groupData = await getGroupDataService(selectedGroup)
                if (groupData.success) {
                    setSelectedGroupData(groupData.grupo)
                }
            }
        }

        getGroupData();
    }, [selectedGroup])

    return (
        <div>
            <div
                className={`w-full bg-white shadow-md rounded-2xl p-2 flex flex-col border border-gray-400 ${!hayReservas ? 'justify-center items-center h-80' : ''
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
                            selectedGroupData={selectedGroupData}
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