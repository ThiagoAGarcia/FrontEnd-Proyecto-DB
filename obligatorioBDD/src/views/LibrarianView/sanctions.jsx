import postSanctionService from "../../service/postSanctionService";
import { useState } from "react";
import ModalSanction from "./components/modalSanction";

export default function Sanctions({ finishedReservations }) {
    const hayReservas = Array.isArray(finishedReservations) && finishedReservations.length > 0;
    const [selectedGroup, setSelectedGroup] = useState('')
    const [selectedGroupData, setSelectedGroupData] = useState(null)

    const selectGroup = (open, groupId) => {
        setInfoOpen(open);
        setSelectedGroup(groupId);
    }

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

    const handleNewSanction = async () => {
        const newSanction = await postSanctionService();
        if (newSanction.success) {

        }
    }

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
                            <div className="w-1/2 sm:w-1/3 text-center">Acciones</div>
                        </div>

                        <ul className="w-full overflow-auto scrollbar mt-1">
                            {finishedReservations &&
                                finishedReservations.map((reservation) => (
                                    <li key={reservation.studyGroupId}>
                                        <Data reserva={reservation}>
                                            <button
                                                onClick={() =>
                                                    selectGroup(true, reservation.studyGroupId)
                                                }
                                                title="Nueva sanción"
                                                className="border-1 rounded-md sm:mx-1 px-2 mx-0.5 p-0.5 bg-gray-300 hover:bg-gray-200  cursor-pointer transition-colors">                                                <i className="fa-solid fa-circle-exclamation text-[#052e66]"></i>
                                            </button>
                                        </Data>
                                    </li>
                                ))}
                        </ul>
                        <ModalSanction
                            selectedGroupData={selectedGroupData}
                        />
                    </>
                ) : (
                    <span className="font-medium text-2xl text-gray-600">
                        No se ha enviado ninguna sanción hoy
                    </span>
                )}
            </div>
        </div>
    )
}